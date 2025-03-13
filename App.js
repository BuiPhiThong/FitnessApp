import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

// Import Workout Context
import WorkoutProvider from './src/context/WorkoutProvider';

// Import all screens
import WelcomeScreen from './src/page/welcome/WelcomeScreen';
import GenderScreen from './src/page/welcome/GenderScreen';
import HeightScreen from './src/page/welcome/HeightScreen';
import WeightScreen from './src/page/welcome/WeightScreen';
import GoalScreen from './src/page/welcome/GoalScreen';
import ExercisePreferenceScreen from './src/page/welcome/ExercisePreferenceScreen';
import ExerciseFrequencyScreen from './src/page/welcome/ExerciseFrequencyScreen';
import FitnessLevelScreen from './src/page/welcome/FitnessLevelScreen';
import RewardScreen from './src/page/welcome/RewardScreen';
import FinalScreen from './src/page/welcome/FinalScreen';

// 🔥 Add Workout Screens
import WorkoutOverviewScreen from './src/components/Workout/WorkoutScreen';
import WorkoutDetailScreen from './src/components/Workout/WorkoutDetail';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userCompleted, setUserCompleted] = useState(false);

  // Check if the user has completed the onboarding process
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        // Retrieve the user info completion status from AsyncStorage
        const userInfoCompleted = await AsyncStorage.getItem('userInfoCompleted');
        setUserCompleted(userInfoCompleted === 'true');
      } catch (error) {
        console.error('Error checking user status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserStatus();
  }, []);

  // Show loading indicator while checking user completion status
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <WorkoutProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={userCompleted ? "WorkoutOverview" : "WelcomeScreen"}>
          {/* Welcome and onboarding screens */}
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="GenderScreen" component={GenderScreen} options={{ title: "Chọn giới tính" }} />
          <Stack.Screen name="HeightScreen" component={HeightScreen} options={{ title: "Chiều cao" }} />
          <Stack.Screen name="WeightScreen" component={WeightScreen} options={{ title: "Cân nặng" }} />
          <Stack.Screen name="GoalScreen" component={GoalScreen} options={{ title: "Mục tiêu" }} />
          <Stack.Screen name="ExercisePreferenceScreen" component={ExercisePreferenceScreen} options={{ title: "Sở thích tập luyện" }} />
          <Stack.Screen name="ExerciseFrequencyScreen" component={ExerciseFrequencyScreen} options={{ title: "Tần suất tập luyện" }} />
          <Stack.Screen name="FitnessLevelScreen" component={FitnessLevelScreen} options={{ title: "Trình độ" }} />
          <Stack.Screen name="RewardScreen" component={RewardScreen} options={{ title: "Phần thưởng" }} />
          <Stack.Screen name="FinalScreen" component={FinalScreen} options={{ title: "Hoàn thành", headerLeft: null }} />
          
          {/* Workout screens */}
          <Stack.Screen name="WorkoutOverview" component={WorkoutOverviewScreen} options={{ title: "Kế hoạch tập luyện", headerLeft: null }} />
          <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} options={{ title: "Chi tiết bài tập" }} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </WorkoutProvider>
  );
}
