import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';

const workoutsData = [
  { day: "Ngày 1", time: "9 phút", exercises: 5, image: "https://example.com/ex1.jpg" },
  { day: "Ngày 2", time: "9 phút", exercises: 4, image: "https://example.com/ex2.jpg" },
  { day: "Ngày 3", time: "9 phút", exercises: 6, image: "https://example.com/ex3.jpg" },
  { day: "Ngày 4", time: "9 phút", exercises: 5, image: "https://example.com/ex4.jpg" },
];

const WorkoutOverviewScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>CƠ BẮP VÙNG TRÊN MẠNH MẼ</Text>
      <Text style={styles.subHeader}>4 Tuần • 0% Hoàn thành</Text>

      <FlatList
        data={workoutsData}
        keyExtractor={(item) => item.day}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.dayItem}
            onPress={() => navigation.navigate("WorkoutDetail", { selectedDay: item })}
          >
            <Image source={{ uri: item.image }} style={styles.dayImage} />
            <View>
              <Text style={styles.dayText}>{item.day}</Text>
              <Text style={styles.daySubText}>{item.time} • {item.exercises} bài tập</Text>
            </View>
          </TouchableOpacity>
        )}
      />
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
  dayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dayImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  daySubText: {
    fontSize: 12,
    color: 'gray',
  },
});

export default WorkoutOverviewScreen;
