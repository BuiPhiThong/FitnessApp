import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeightScreen = ({ navigation }) => {
  const [height, setHeight] = useState('178');

  const saveHeight = async () => {
    await AsyncStorage.setItem('height', height);
    navigation.navigate('WeightScreen');  // Chuyển sang màn tiếp theo
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chiều cao của bạn là bao nhiêu?</Text>
      <TextInput
        style={styles.input}
        value={height}
        keyboardType="numeric"
        onChangeText={setHeight}
      />
      <TouchableOpacity style={styles.button} onPress={saveHeight}>
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

export default HeightScreen;
