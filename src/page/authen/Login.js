import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios'; // Dùng axios để gửi yêu cầu HTTP
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState(''); // Lưu tên người dùng
  const [password, setPassword] = useState(''); // Lưu mật khẩu
  const [error, setError] = useState(''); // Lưu thông báo lỗi

  // Hàm xử lý đăng nhập
  const loginUser = async () => {
    try {
      const response = await axios.post('http://192.168.137.1:9999/login', {
        username, 
        password,
      });

      if (response.data.token) {
        // Lưu thông tin người dùng và token vào AsyncStorage
        await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));

        // Điều hướng đến màn hình chính
        navigation.replace('HomeScreen');
      } else {
        setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      }
    } catch (err) {
      console.error('Lỗi đăng nhập:', err);
      setError('Đăng nhập thất bại. Vui lòng thử lại!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Tên người dùng"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={loginUser}>
        <Text style={styles.buttonText}>Đăng Nhập</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={styles.registerText}>Chưa có tài khoản? Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  registerText: {
    marginTop: 20,
    color: '#4CAF50',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
