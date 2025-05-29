import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'; // Додали Image

// Оновимо newsData, додавши поле для зображення
const newsData = [
  { id: '1', title: 'Заголовок новини 1', date: 'Дата новини', shortText: 'Короткий текст новини тут...', image: require('../assets/images.png') }, // Шлях до зображення
  { id: '2', title: 'Заголовок новини 2', date: 'Дата новини', shortText: 'Короткий текст новини тут...', image: require('../assets/images.png') },
  { id: '3', title: 'Заголовок новини 3', date: 'Дата новини', shortText: 'Короткий текст новини тут...', image: require('../assets/images.png') },
  // Додай інші новини з відповідними шляхами до зображень
  // Якщо для якоїсь новини немає зображення, можна залишити null або заглушку
  { id: '4', title: 'Заголовок новини 4 (без фото)', date: 'Дата новини', shortText: 'Короткий текст новини тут...', image: null },
];

// Оновимо NewsItem для відображення зображення
const NewsItem = ({ title, date, shortText, image }) => ( // Додали image в props
  <View style={styles.newsItem}>
    {image ? (
      <Image source={image} style={styles.newsImage} />
    ) : (
      <View style={[styles.newsImage, styles.imagePlaceholder]} /> // Заглушка, якщо немає фото
    )}
    <View style={styles.newsTextContainer}>
      <Text style={styles.newsTitle}>{title}</Text>
      <Text style={styles.newsDate}>{date}</Text>
      <Text style={styles.newsShortText}>{shortText}</Text>
    </View>
  </View>
);

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Новини</Text>
      <FlatList
        data={newsData}
        renderItem={({ item }) => <NewsItem title={item.title} date={item.date} shortText={item.shortText} image={item.image} />} // Передаємо image
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  list: {
    flex: 1,
  },
  newsItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  newsImage: { // Стилі для зображення новини
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 5, // опціонально, для заокруглених кутів
  },
  imagePlaceholder: { // Стиль для заглушки, якщо немає фото
    backgroundColor: '#ccc',
  },
  newsTextContainer: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  newsDate: {
    fontSize: 12,
    color: '#666',
    marginVertical: 2,
  },
  newsShortText: {
    fontSize: 14,
    color: '#333',
  },
});

export default HomeScreen;