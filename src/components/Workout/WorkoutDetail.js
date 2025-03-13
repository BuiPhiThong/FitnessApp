import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const API_EXERCISES = 'http://10.33.8.133:9999/exercises'; // Sửa lại địa chỉ IP
const { width } = Dimensions.get('window');

const WorkoutDetailScreen = ({ route, navigation }) => {
  const { selectedWorkout } = route.params;
  const [detailedExercises, setDetailedExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Thêm trạng thái để theo dõi các bài tập đã hoàn thành
  const [completedExercises, setCompletedExercises] = useState([]);

  // Hàm đánh dấu bài tập hoàn thành
  const markExerciseAsCompleted = (exerciseId) => {
    // Tạo bản sao của detailedExercises
    const updatedExercises = detailedExercises.map(exercise => {
      if (exercise.exerciseId === exerciseId) {
        return { ...exercise, completed: true };
      }
      return exercise;
    });
  
    // Cập nhật trạng thái
    setDetailedExercises(updatedExercises);
  
    // Gửi yêu cầu PUT để cập nhật workout trên JSON Server
    fetch(`http://10.33.8.133:9999/workouts/${selectedWorkout.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...selectedWorkout,
        exercises: updatedExercises.map(exercise => ({
          exerciseId: exercise.exerciseId,
          sets: exercise.sets,
          reps: exercise.reps,
          completed: exercise.completed
        }))
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Lỗi HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("✅ Workout đã được cập nhật:", data);
    })
    .catch(error => {
      console.error("❌ Lỗi khi cập nhật workout:", error);
    });
  };
  
  const completedCount = detailedExercises.filter(exercise => exercise.completed).length;
  const completionPercentage = Math.round((completedCount / detailedExercises.length) * 100);
  
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(API_EXERCISES);
        const allExercises = await response.json();

        // Ghép tên bài tập với dữ liệu selectedWorkout.exercises
        const enrichedExercises = selectedWorkout.exercises.map(exercise => {
          const exerciseDetail = allExercises.find(e => e.id === exercise.exerciseId);
          return {
            ...exercise,
            name: exerciseDetail ? exerciseDetail.name : "Không xác định",
            imageURLs: exerciseDetail ? exerciseDetail.imageURLs : ["https://example.com/default.jpg"],
            description: exerciseDetail ? exerciseDetail.description : "",
            instructions: exerciseDetail ? exerciseDetail.instructions : "",
            completed: exercise.completed || false // Thêm trạng thái completed
          };
        });

        setDetailedExercises(enrichedExercises);
      } catch (error) {
        console.error("❌ Lỗi khi tải bài tập chi tiết:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [selectedWorkout]);

  // Hiển thị slider ảnh cho bài tập được chọn
  const renderImageSlider = () => {
    if (!selectedExercise) return null;

    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{selectedExercise.name}</Text>

          <ScrollView 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const slideIndex = Math.floor(event.nativeEvent.contentOffset.x / width * 0.9);
              setCurrentImageIndex(slideIndex);
            }}
          >
            {selectedExercise.imageURLs.map((image, index) => (
              <Image 
                key={index} 
                source={{ uri: image }} 
                style={styles.sliderImage} 
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          <View style={styles.paginationContainer}>
            {selectedExercise.imageURLs.map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.paginationDot, 
                  currentImageIndex === index ? styles.paginationDotActive : {}
                ]} 
              />
            ))}
          </View>

          <Text style={styles.modalDescription}>{selectedExercise.description}</Text>
          <Text style={styles.modalInstructions}>{selectedExercise.instructions}</Text>

          <TouchableOpacity 
            style={styles.completeButton} 
            onPress={() => {
              markExerciseAsCompleted(selectedExercise.exerciseId);
              setSelectedExercise(null); // Đóng modal sau khi hoàn thành
            }}
          >
            <Text style={styles.completeButtonText}>Hoàn thành</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => setSelectedExercise(null)}
          >
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Kiểm tra nếu dữ liệu chưa sẵn sàng
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Đang tải chi tiết bài tập...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{selectedWorkout.name || "Không có tiêu đề"}</Text>
      <Text style={styles.subHeader}>Thời gian: {selectedWorkout.duration || "Không rõ thời gian"}</Text>
      <Text style={styles.completionText}>
        Hoàn thành: {completionPercentage}% ({completedCount}/{detailedExercises.length} bài)
      </Text>
      {/* Hiển thị danh sách bài tập */}
      <FlatList
  data={detailedExercises}
  keyExtractor={(item, index) => item.exerciseId?.toString() || index.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity 
      style={styles.exerciseItem}
      onPress={() => {
        setSelectedExercise(item);
        setCurrentImageIndex(0);
      }}
    >
      <Image 
        source={{ uri: item.imageURLs[0] }} 
        style={styles.exerciseImage} 
      />
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <Text style={styles.exerciseTime}>{item.sets} sets x {item.reps} reps</Text>
      </View>
      {item.completed && (
        <FontAwesome name="check-circle" size={30} color="green" />
      )}
    </TouchableOpacity>
  )}
/>


      {/* Hiển thị modal slider khi chọn một bài tập */}
      {selectedExercise && renderImageSlider()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
  },
  exerciseImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  exerciseTime: {
    fontSize: 14,
    color: 'gray',
  },
  // Styles cho modal slider
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    width: width * 0.9,
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  sliderImage: {
    width: width * 0.85,
    height: 200,
    borderRadius: 10,
    marginHorizontal: width * 0.025,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#4CAF50',
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 22,
  },
  modalInstructions: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 20,
    lineHeight: 20,
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  completionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginVertical: 10,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Thêm dòng này
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
  },
  
});

export default WorkoutDetailScreen;
