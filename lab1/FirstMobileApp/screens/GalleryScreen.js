import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native'; // Додали Image та Dimensions

// Генеруємо дані для галереї, тепер з посиланнями на зображення
const galleryData = [
  { id: 'gallery-1', image: require('../assets/images.png') },
  { id: 'gallery-2', image: require('../assets/images.png') },
  { id: 'gallery-3', image: require('../assets/images.png') },
  { id: 'gallery-4', image: require('../assets/images.png') }, // Додай свої зображення
  { id: 'gallery-5', image: require('../assets/images.png') },
  { id: 'gallery-6', image: require('../assets/images.png') },
  // ... і так далі, стільки, скільки потрібно
];

const numColumns = 2; // Кількість колонок
const screenWidth = Dimensions.get('window').width; // Отримуємо ширину екрана

const GalleryItem = ({ item }) => ( // item тепер містить { id, image }
  <View style={styles.galleryItemContainer}>
    <Image source={item.image} style={styles.galleryImage} resizeMode="cover" />
  </View>
);

const GalleryScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={galleryData}
        renderItem={GalleryItem} // Передаємо весь item
        keyExtractor={item => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingHorizontal: 5, // Горизонтальні відступи для всього списку
  },
  galleryItemContainer: {
    flex: 1 / numColumns, // Розділяємо ширину на кількість колонок
    margin: 5, // Відступи між елементами
    aspectRatio: 1, // Робить елемент квадратним, можна налаштувати
    // Висота елемента галереї тепер буде залежати від ширини та aspectRatio
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8, // опціонально
  },
});

export default GalleryScreen;