import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FinalScreen = ({ navigation }) => {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const loadData = async () => {
            const data = {
                gender: await AsyncStorage.getItem('gender'),
                height: await AsyncStorage.getItem('height'),
                weight: await AsyncStorage.getItem('weight'),
                goal: await AsyncStorage.getItem('goal'),
                exercisePreference: await AsyncStorage.getItem('exercisePreference'),
                exerciseFrequency: await AsyncStorage.getItem('exerciseFrequency'),
                fitnessLevel: await AsyncStorage.getItem('fitnessLevel'),
                reward: await AsyncStorage.getItem('reward'),
            };
            setUserData(data);
        };
        loadData();
    }, []);

    const saveDataToJsonServer = async () => {
        try {
            const response = await fetch('http://192.168.13.105:9999/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                alert('Dữ liệu đã được lưu vào database.json!');
                navigation.replace("WorkoutOverview"); // 🔥 Chuyển hướng đến màn hình tập luyện
            } else {
                alert('Lỗi khi lưu dữ liệu!');
            }
        } catch (error) {
            console.error('Lỗi gửi dữ liệu:', error);
            alert('Không thể kết nối đến server!');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chúc mừng bạn đã hoàn thành!</Text>
            <TouchableOpacity style={styles.button} onPress={saveDataToJsonServer}>
                <Text style={styles.buttonText}>Chuyển sang màn hình chính</Text>
            </TouchableOpacity>
        </View>
    );
};

// 🎨 **Styles**
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: {
        marginTop: 30,
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default FinalScreen;
