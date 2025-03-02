import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WeightScreen = ({ navigation }) => {
  const [weight, setWeight] = useState('75.0');

  const saveWeight = async () => {
    await AsyncStorage.setItem('weight', weight);
    navigation.navigate('GoalScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cân nặng hiện tại của bạn là bao nhiêu?</Text>
      <TextInput
        style={styles.input}
        value={weight}
        keyboardType="numeric"
        onChangeText={setWeight}
      />
      <TouchableOpacity style={styles.button} onPress={saveWeight}>
        <Text style={styles.buttonText}>Tiếp theo</Text>
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
  },
  input: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    width: '80%',
    padding: 10,
    borderBottomWidth: 2,
    borderColor: '#4CAF50',
  },
  unitButton: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  bmiText: {
    fontSize: 16,
    marginTop: 10,
    color: '#4CAF50',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default WeightScreen;
