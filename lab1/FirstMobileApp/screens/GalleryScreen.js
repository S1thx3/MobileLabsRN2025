import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';

// Генеруємо дані для галереї (8 елементів, 2 колонки)
const galleryData = Array.from({ length: 10 }, (_, i) => ({ id: `gallery-${i}` }));

const GalleryItem = () => (
  <View style={styles.galleryItem}>
    {/* Це просто заглушка для зображення */}
  </View>
);

const GalleryScreen = () => {
  return (
    <View style={styles.container}>
       {/* <Text style={styles.screenTitle}>Фотогалерея</Text> // Заголовок екрану вже є в навігаторі та шапці */}
      <FlatList
        data={galleryData}
        renderItem={({ item }) => <GalleryItem />}
        keyExtractor={item => item.id}
        numColumns={2} // Для сітки з двох колонок
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
//   screenTitle: { // Якщо потрібен окремий заголовок всередині екрана
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 15,
//   },
  listContainer: {
    padding: 5,
  },
  galleryItem: {
    flex: 1,
    margin: 5,
    height: 150, // Висота елемента галереї
    backgroundColor: '#e0e0e0', // Колір заглушки
    justifyContent: 'center',
    alignItems: 'center',
    // Тут можна буде додати Image
  },
  // galleryText: { // Якщо хочеш додати текст на заглушку
  //   color: '#777',
  // },
});

export default GalleryScreen;