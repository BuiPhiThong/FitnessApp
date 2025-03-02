import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GoalScreen = ({ navigation }) => {
  const saveGoal = async (goal) => {
    await AsyncStorage.setItem('goal', goal);
    navigation.navigate('ExercisePreferenceScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mục tiêu chính của bạn là gì?</Text>
      <TouchableOpacity style={styles.button} onPress={() => saveGoal('Giảm cân')}>
        <Text style={styles.buttonText}>Giảm cân</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => saveGoal('Xây dựng cơ bắp')}>
        <Text style={styles.buttonText}>Xây dựng cơ bắp</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => saveGoal('Giữ dáng')}>
        <Text style={styles.buttonText}>Giữ dáng</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    marginHorizontal: 30,
  },
  goalButtons: {
    marginTop: 30,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 30,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default GoalScreen;
