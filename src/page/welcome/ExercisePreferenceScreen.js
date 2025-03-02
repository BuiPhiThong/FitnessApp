import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExercisePreferenceScreen = ({ navigation }) => {
  const savePreference = async (preference) => {
    await AsyncStorage.setItem('exercisePreference', preference);
    navigation.navigate('ExerciseFrequencyScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bạn thường tập thể dục ở đâu?</Text>
      <TouchableOpacity style={styles.button} onPress={() => savePreference('Trên thảm')}>
        <Text style={styles.buttonText}>Trên thảm</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => savePreference('Trên giường')}>
        <Text style={styles.buttonText}>Trên giường</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => savePreference('Ngoài trời')}>
        <Text style={styles.buttonText}>Ngoài trời</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => savePreference('Bất kỳ nơi nào')}>
        <Text style={styles.buttonText}>Bất kỳ nơi nào</Text>
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

export default ExercisePreferenceScreen;
