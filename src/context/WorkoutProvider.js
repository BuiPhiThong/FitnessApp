import React, { createContext, useState, useEffect } from 'react';

export const WorkoutContext = createContext();

 const WorkoutProvider = ({ children }) => {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        fetch('http://192.168.13.105:9999/workouts')
            .then(response => response.json())
            .then(data => setWorkouts(data))
            .catch(error => console.error("❌ Lỗi khi tải bài tập:", error));
    }, []);

    return (
        <WorkoutContext.Provider value={{ workouts, setWorkouts }}>
            {children}
        </WorkoutContext.Provider>
    );
};
export default WorkoutProvider