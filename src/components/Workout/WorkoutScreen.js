import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useWorkoutData } from '../../service/WorkoutService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome for icons

const WorkoutOverviewScreen = ({ navigation }) => {
    const { workouts, loading, error } = useWorkoutData();

    // Disable the back swipe gesture on this screen
    useEffect(() => {
        navigation.setOptions({
            headerLeft: null,  // This will remove the back button
            gestureEnabled: false,  // Disable swipe gesture to go back
        });
    }, [navigation]);

    const isWorkoutCompleted = (workout) => {
        return workout.exercises.every(exercise => exercise.completed);
    };

    const handleReset = async () => {
        try {
            await AsyncStorage.removeItem('userInfoCompleted');
            const response = await fetch('http://10.33.8.133:9999/workouts');
            const workouts = await response.json();
            for (const workout of workouts) {
                const updatedExercises = workout.exercises.map(exercise => ({
                    ...exercise,
                    completed: false
                }));
                await fetch(`http://10.33.8.133:9999/workouts/${workout.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...workout,
                        exercises: updatedExercises
                    }),
                });
            }
            navigation.replace('WelcomeScreen');
        } catch (error) {
            console.error('Lỗi khi đặt lại thông tin:', error);
        }
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Đang tải bài tập...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>❌ Lỗi khi tải bài tập</Text>
                <Text style={styles.subHeader}>{error}</Text>
            </View>
        );
    }

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

            <FlatList
                data={workouts}
                keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
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
                        {isWorkoutCompleted(item) && (
                            <FontAwesome name="check-circle" style={styles.chuv} size={30} color="green" />
                        )}
                    </TouchableOpacity>
                )}
            />

            {/* Nút đặt lại thông tin */}
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                <Text style={styles.resetButtonText}>Đặt lại thông tin</Text>
            </TouchableOpacity>

            {/* Bottom Navigation Bar */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('WorkoutOverview')}>
                    <FontAwesome name="clipboard" size={20} color="#333" />
                    <Text style={styles.navText}>Kế hoạch</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} >
                    <FontAwesome name="search" size={20} color="#333" />
                    <Text style={styles.navText}>Khám Phá</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} >
                    <FontAwesome name="history" size={20} color="#333" />
                    <Text style={styles.navText}>Lịch sử</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Favorites')}>
                    <FontAwesome name="heart" size={20} color="#333" />
                    <Text style={styles.navText}>Yêu thích</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Styles for Bottom Navigation
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
    // Bottom Navigation Styles
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingVertical: 10,
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default WorkoutOverviewScreen;
