import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GenderScreen = ({ navigation }) => {
  const saveGender = async (gender) => {
    await AsyncStorage.setItem('gender', gender);
    navigation.navigate('HeightScreen');  // Chuyển sang màn tiếp theo
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cho chúng tôi biết giới tính của bạn</Text>
      <Text style={styles.subtitle}>
        Điều này sẽ giúp chúng tôi tính toán tốc độ trao đổi chất của bạn để điều chỉnh cường độ.
      </Text>

      <View style={styles.genderButtons}>
        <TouchableOpacity style={styles.button} onPress={() => saveGender('Male')}>
          <Text style={styles.buttonText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => saveGender('Female')}>
          <Text style={styles.buttonText}>Female</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.skipButton} onPress={() => saveGender('Other')}>
        <Text style={styles.buttonText}>Khác / Không muốn tiết lộ</Text>
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
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    marginHorizontal: 30,
  },
  genderButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  skipButton: {
    marginTop: 20,
    backgroundColor: '#ccc',
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

export default GenderScreen;
