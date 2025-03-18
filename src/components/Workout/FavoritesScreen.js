import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_EXERCISES = 'http://192.168.13.105:9999/exercises'; // Replace with correct IP address
const { width } = Dimensions.get('window');

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(API_EXERCISES);
        const allExercises = await response.json();
        setExercises(allExercises);  // Save exercise list from API
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  // Fetch favorites from AsyncStorage
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          const favoriteIds = JSON.parse(storedFavorites);
          // Map favorite IDs to actual exercise data
          const favoriteExercises = exercises.filter(exercise =>
            favoriteIds.includes(exercise.id)
          );
          setFavorites(favoriteExercises);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [exercises]);

  // Render Image Carousel
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
                style={[styles.paginationDot, currentImageIndex === index ? styles.paginationDotActive : {}]}
              />
            ))}
          </View>

          <Text style={styles.modalDescription}>{selectedExercise.description}</Text>

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

  // Ensure favorites is always an array to avoid rendering errors
  const safeFavorites = Array.isArray(favorites) ? favorites : [];

  const renderFavoriteExercise = ({ item }) => {
    if (!item || !item.imageURLs || item.imageURLs.length === 0) {
      return null;
    }

    return (
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
          <Text style={styles.exerciseName}>{item.name || 'Không có tên'}</Text>
          <Text style={styles.exerciseTime}>
            {item.sets} sets x {item.reps} reps
          </Text>
        </View>
        <FontAwesome name="heart" size={30} color="red" />
      </TouchableOpacity>
    );
  };

  if (!favorites || favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Không có bài tập yêu thích nào.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Yêu thích của bạn</Text>
      <FlatList
        data={safeFavorites}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        renderItem={renderFavoriteExercise}
      />

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
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
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
});

export default FavoritesScreen;
