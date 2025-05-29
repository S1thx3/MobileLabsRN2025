import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image } from 'react-native';

const newsData = [
  // Приклад даних, можна додати більше
  { id: '1', title: 'Заголовок новини 1', date: 'Дата новини', shortText: 'Короткий текст новини тут...' },
  { id: '2', title: 'Заголовок новини 2', date: 'Дата новини', shortText: 'Короткий текст новини тут...' },
  { id: '3', title: 'Заголовок новини 3', date: 'Дата новини', shortText: 'Короткий текст новини тут...' },
  { id: '4', title: 'Заголовок новини 4', date: 'Дата новини', shortText: 'Короткий текст новини тут...' },
  { id: '5', title: 'Заголовок новини 5', date: 'Дата новини', shortText: 'Короткий текст новини тут...' },
  { id: '6', title: 'Заголовок новини 6', date: 'Дата новини', shortText: 'Короткий текст новини тут...' },
  { id: '7', title: 'Заголовок новини 7', date: 'Дата новини', shortText: 'Короткий текст новини тут...' },
  { id: '8', title: 'Заголовок новини 8', date: 'Дата новини', shortText: 'Короткий текст новини тут...' },
];

const NewsItem = ({ title, date, shortText }) => (
  <View style={styles.newsItem}>
    <View style={styles.imagePlaceholder} />
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
        renderItem={({ item }) => <NewsItem title={item.title} date={item.date} shortText={item.shortText} />}
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
  imagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#ccc', // Колір заглушки
    marginRight: 15,
    // Можна додати іконку, якщо є
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  // placeholderIcon: { /* Стилі для іконки, якщо використовується */ },
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