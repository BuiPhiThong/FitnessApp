import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FitnessLevelScreen = ({ navigation }) => {
  const saveFitnessLevel = async (level) => {
    await AsyncStorage.setItem('fitnessLevel', level);
    navigation.navigate('RewardScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ước tính trình độ thể dục của bạn</Text>
      <TouchableOpacity style={styles.button} onPress={() => saveFitnessLevel('Người bắt đầu')}>
        <Text style={styles.buttonText}>Người bắt đầu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => saveFitnessLevel('Trung bình')}>
        <Text style={styles.buttonText}>Trung bình</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => saveFitnessLevel('Nâng cao')}>
        <Text style={styles.buttonText}>Nâng cao</Text>
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
});

export default FitnessLevelScreen;
