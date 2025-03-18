import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BMICalculatorScreen = ({ navigation }) => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [bmiCategory, setBmiCategory] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const loadUserData = async () => {
            const storedHeight = await AsyncStorage.getItem('height');
            const storedWeight = await AsyncStorage.getItem('weight');
            if (storedHeight && storedWeight) {
                setHeight(storedHeight);
                setWeight(storedWeight);
            }
        };
        loadUserData();
    }, []);

    const calculateBMI = () => {
        if (!height || !weight) {
            setError('Vui lòng nhập chiều cao và cân nặng');
            return;
        }
    
        const heightInMeters = parseFloat(height) / 100;
        const weightInKg = parseFloat(weight);
        const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    
        let category = '';
        if (bmiValue < 18.5) {
            category = 'underweight'; // Thay 'Gầy' bằng 'Underweight'
        } else if (bmiValue < 24.9) {
            category = 'normal'; // Thay 'Bình thường' bằng 'Normal'
        } else if (bmiValue < 29.9) {
            category = 'overweight'; // Thay 'Thừa cân' bằng 'Overweight'
        } else {
            category = 'obese'; // Thay 'Béo phì' bằng 'Obese'
        }
    
        // Lưu vào AsyncStorage ngay khi có giá trị BMI và phân loại
        AsyncStorage.setItem('height', height);
        AsyncStorage.setItem('weight', weight);
        AsyncStorage.setItem('bmi', bmiValue.toString());
        AsyncStorage.setItem('bmiCategory', category); // Lưu phân loại bằng tiếng Anh
    
        // Cập nhật state sau khi lưu dữ liệu
        setBmi(bmiValue);
        setBmiCategory(category);
    };
    
    
    

    const handleProceed = () => {
        // Lưu BMI và phân loại vào AsyncStorage
        AsyncStorage.setItem('bmi', bmi.toString());
        AsyncStorage.setItem('bmiCategory', bmiCategory);
    
        // Chuyển hướng đến màn hình workout với dữ liệu BMI
        navigation.navigate('FinalScreen');
    };
    

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Tính Chỉ Số BMI</Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Chiều cao (cm)"
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Cân nặng (kg)"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={calculateBMI}>
                <Text style={styles.buttonText}>Tính BMI</Text>
            </TouchableOpacity>

            {bmi && (
                <View style={styles.resultContainer}>
                    <Text style={styles.result}>Chỉ số BMI: {bmi.toFixed(2)}</Text>
                    <Text style={styles.result}>Phân loại: {bmiCategory}</Text>

                    <Text style={styles.resultDetails}>
                        {bmiCategory === 'Gầy' && 'BMI dưới 18.5 là Gầy. Bạn cần tăng cân và bổ sung dinh dưỡng hợp lý.'}
                        {bmiCategory === 'Bình thường' && 'BMI từ 18.5 đến 24.9 là Bình thường. Bạn có một sức khỏe ổn định.'}
                        {bmiCategory === 'Thừa cân' && 'BMI từ 25 đến 29.9 là Thừa cân. Hãy cân nhắc giảm cân để cải thiện sức khỏe.'}
                        {bmiCategory === 'Béo phì' && 'BMI trên 30 là Béo phì. Bạn cần giảm cân để giảm nguy cơ bệnh lý.'}
                    </Text>

                    <TouchableOpacity style={styles.button} onPress={handleProceed}>
                        <Text style={styles.buttonText}>Tiếp tục</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        width: '80%',
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 18,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    resultContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    result: {
        fontSize: 18,
        marginBottom: 10,
    },
    resultDetails: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#555',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
    },
});

export default BMICalculatorScreen;
