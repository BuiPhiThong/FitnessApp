import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

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

// 🔥 **Thêm màn hình Workout**
import WorkoutOverviewScreen from './src/components/Workout/WorkoutScreen';
import WorkoutDetailScreen from './src/components/Workout/WorkoutDetail'
const Stack = createStackNavigator();

export default function App() {
  return (
    <WorkoutProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WelcomeScreen">
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="GenderScreen" component={GenderScreen} />
          <Stack.Screen name="HeightScreen" component={HeightScreen} />
          <Stack.Screen name="WeightScreen" component={WeightScreen} />
          <Stack.Screen name="GoalScreen" component={GoalScreen} />
          <Stack.Screen name="ExercisePreferenceScreen" component={ExercisePreferenceScreen} />
          <Stack.Screen name="ExerciseFrequencyScreen" component={ExerciseFrequencyScreen} />
          <Stack.Screen name="FitnessLevelScreen" component={FitnessLevelScreen} />
          <Stack.Screen name="RewardScreen" component={RewardScreen} />
          <Stack.Screen name="FinalScreen" component={FinalScreen} />
          {/* 🎯 Thêm màn hình kế hoạch tập luyện */}
          <Stack.Screen name="WorkoutOverview" component={WorkoutOverviewScreen} />
          <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </WorkoutProvider>
  );
}
