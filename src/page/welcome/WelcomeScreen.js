import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xin chào, tôi là huấn luyện viên cá nhân của bạn</Text>
      <Text style={styles.subtitle}>Dưới đây là vài câu hỏi trước khi tôi có thể tùy chỉnh kế hoạch tập luyện tại nhà độc đáo của bạn</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GenderScreen')}>
        <Text style={styles.buttonText}>Hãy bắt đầu!</Text>
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

export default WelcomeScreen;
