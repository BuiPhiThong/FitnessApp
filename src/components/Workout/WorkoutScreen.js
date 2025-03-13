import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useWorkoutData } from '../../service/WorkoutService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WorkoutOverviewScreen = ({ navigation }) => {
    const { workouts, loading, error } = useWorkoutData();

    // Hàm đặt lại thông tin người dùng
    const handleReset = async () => {
        try {
            await AsyncStorage.removeItem('userInfoCompleted');
            // Xóa các thông tin khác nếu cần
            navigation.replace('WelcomeScreen');
        } catch (error) {
            console.error('Lỗi khi đặt lại thông tin:', error);
        }
    };

    // Kiểm tra nếu dữ liệu chưa sẵn sàng
    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Đang tải bài tập...</Text>
            </View>
        );
    }

    // Kiểm tra nếu có lỗi
    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>❌ Lỗi khi tải bài tập</Text>
                <Text style={styles.subHeader}>{error}</Text>
            </View>
        );
    }

    // Nếu không có dữ liệu
    if (!workouts || workouts.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>⚠️ Không có bài tập nào!</Text>
                <Text style={styles.subHeader}>Hãy thử lại sau hoặc thêm bài tập mới.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>🔥 CƠ BẮP VÙNG TRÊN MẠNH MẼ 🔥</Text>
            {/* <Text style={styles.subHeader}>4 Tuần • 0% Hoàn thành</Text> */}

            <FlatList
                data={workouts}
                keyExtractor={(item) => item.id?.toString() || Math.random().toString()} // Tránh lỗi key null
                renderItem={({ item }) => (
                  <TouchableOpacity
                  style={styles.dayItem}
                  onPress={() => navigation.navigate("WorkoutDetail", { selectedWorkout: item })}
                >
                  <Image 
                    source={{ uri: item.exercises?.[0]?.imageURLs?.[0] || 'https://example.com/default.jpg' }} 
                    style={styles.dayImage} 
                  />
                  <View>
                    <Text style={styles.dayText}>{item.name || "Không có tiêu đề"}</Text>
                    <Text style={styles.daySubText}>{item.duration || "Không rõ thời gian"} • {item.exercises?.length || 0} bài tập</Text>
                  </View>
                </TouchableOpacity>
                
                )}
            />
            
            {/* Nút đặt lại thông tin */}
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                <Text style={styles.resetButtonText}>Đặt lại thông tin</Text>
            </TouchableOpacity>
        </View>
    );
};

// 🎨 **Styles**
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20 },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
    subHeader: { fontSize: 14, textAlign: 'center', color: 'gray', marginBottom: 20 },
    dayItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 15, marginBottom: 10, borderWidth: 1, borderColor: '#ccc' },
    dayImage: { width: 60, height: 60, borderRadius: 10, marginRight: 10 },
    dayText: { fontSize: 16, fontWeight: 'bold' },
    daySubText: { fontSize: 12, color: 'gray' },
    // Style cho nút đặt lại thông tin
    resetButton: {
        backgroundColor: '#ff5252',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginTop: 20,
        alignSelf: 'center',
    },
    resetButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default WorkoutOverviewScreen;
