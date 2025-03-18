import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RewardScreen = ({ navigation }) => {
  const saveReward = async (reward) => {
    await AsyncStorage.setItem('reward', reward);
    navigation.navigate('BMICalculatorScreen'); // Navigate to BMI calculator after selecting reward
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phần thưởng của bạn khi đạt được mục tiêu cân nặng là gì?</Text>
      <TouchableOpacity style={styles.button} onPress={() => saveReward('Mua quần áo mới')}>
        <Text style={styles.buttonText}>Mua quần áo mới</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => saveReward('Thưởng thức bữa ăn ngon')}>
        <Text style={styles.buttonText}>Thưởng thức bữa ăn ngon</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => saveReward('Mua một món quà đặc biệt')}>
        <Text style={styles.buttonText}>Mua một món quà đặc biệt</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => saveReward('Đi du lịch')}>
        <Text style={styles.buttonText}>Đi du lịch</Text>
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

export default RewardScreen;
