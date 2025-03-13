// src/services/WorkoutService.js
import { useState, useEffect } from 'react';
const API_URL = 'http://10.33.8.133:9999/workouts'; // Địa chỉ đúng của JSON Server

// Hàm lấy danh sách bài tập phù hợp cho từng user
const getWorkoutsForUser = (user, exercises, levelExercises) => {
    // Tìm bài tập theo levelId của user
    const userExercises = levelExercises
        .filter(le => le.levelId === user.levelId)
        .map(le => {
            const exerciseDetail = exercises.find(e => e.id === le.exerciseId);
            return {
                ...exerciseDetail,
                sets: le.sets,
                reps: le.reps
            };
        });

    return {
        userId: user.id,
        name: `${user.name} - Kế hoạch tập luyện`,
        date: new Date().toISOString().split('T')[0], // Ngày hiện tại
        duration: "60 phút",
        exercises: userExercises,
        notes: `Chương trình tập luyện dành cho ${user.goal} - Trình độ ${user.levelId}`
    };
};

// Hàm gán bài tập cho tất cả user
const assignWorkoutsToUsers = (users, exercises, levelExercises) => {
    return users.map(user => getWorkoutsForUser(user, exercises, levelExercises));
};

// Hàm lưu danh sách bài tập lên json-server
const saveWorkoutsToServer = async (workouts) => {
    try {
        const response = await fetch('http://10.33.8.133:9999/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(workouts),
        });

        const result = await response.json();
        console.log("✅ Dữ liệu tập luyện đã được lưu!", result);
    } catch (error) {
        console.error("❌ Lỗi khi lưu bài tập:", error);
    }
};

// Hook để gọi dữ liệu từ server
const useWorkoutData = () => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(`Lỗi mạng: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                
                // 🛠️ Đảm bảo dữ liệu trả về là một mảng (tránh lỗi undefined)
                setWorkouts(Array.isArray(data) ? data : []);
                console.log("✅ Dữ liệu bài tập:", data);
            } catch (error) {
                console.error("❌ Lỗi khi tải bài tập:", error);
                setError(error.message);
                setWorkouts([]); // Tránh bị undefined
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, []);

    return { workouts, loading, error };
};


export { getWorkoutsForUser, assignWorkoutsToUsers, saveWorkoutsToServer, useWorkoutData };
