import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ExerciseFrequencyScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bạn muốn tập luyện thường xuyên như thế nào?</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FitnessLevelScreen')}>
        <Text style={styles.buttonText}>1 lần/tuần</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FitnessLevelScreen')}>
        <Text style={styles.buttonText}>2 lần/tuần</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FitnessLevelScreen')}>
        <Text style={styles.buttonText}>3 lần/tuần</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FitnessLevelScreen')}>
        <Text style={styles.buttonText}>4 lần/tuần</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('FitnessLevelScreen')}>
        <Text style={styles.nextButtonText}>Tiếp theo</Text>
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

export default ExerciseFrequencyScreen;
