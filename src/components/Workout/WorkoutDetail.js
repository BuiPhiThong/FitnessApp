import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';

const WorkoutDetailScreen = ({ route, navigation }) => {
  const { selectedDay } = route.params;

  const exercisesData = {
    "Ngày 1": [
      { id: 1, name: "Gập người xe đạp đứng", duration: "00:30", image: "https://example.com/ex1.jpg" },
      { id: 2, name: "Chống đẩy vào tường", duration: "00:30", image: "https://example.com/ex2.jpg" },
      { id: 3, name: "Đấm", duration: "00:30", image: "https://example.com/ex3.jpg" },
      { id: 4, name: "Đá tay sau về sau", duration: "00:30", image: "https://example.com/ex4.jpg" },
      { id: 5, name: "Con bọ", duration: "00:30", image: "https://example.com/ex5.jpg" },
    ],
    "Ngày 2": [
      { id: 1, name: "Plank", duration: "00:30", image: "https://example.com/ex6.jpg" },
      { id: 2, name: "Mountain Climbers", duration: "00:30", image: "https://example.com/ex7.jpg" },
      { id: 3, name: "Russian Twist", duration: "00:30", image: "https://example.com/ex8.jpg" },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{selectedDay.day}</Text>
      <Text style={styles.subHeader}>Thời gian: {selectedDay.time}</Text>

      <FlatList
        data={exercisesData[selectedDay.day]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            <Image source={{ uri: item.image }} style={styles.exerciseImage} />
            <View>
              <Text style={styles.exerciseName}>{item.name}</Text>
              <Text style={styles.exerciseTime}>{item.duration}</Text>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>KHỞI ĐẦU</Text>
      </TouchableOpacity>
    </View>
  );
};

// 🎨 **Styles**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 14,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  exerciseImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  exerciseTime: {
    fontSize: 12,
    color: 'gray',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WorkoutDetailScreen;
