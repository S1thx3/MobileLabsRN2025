import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// У тебе має бути зображення логотипу в папці assets
// Наприклад, assets/logo.png
// Якщо немає, тимчасово можна обійтися без нього або використати заглушку

const AppHeader = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          {/* Якщо є логотип: */}
          {/* <Image source={require('../assets/logo.png')} style={styles.logo} /> */}
          <Text style={styles.logoText}>ЖИТОМИРСЬКА</Text>
          <Text style={styles.logoText}>ПОЛІТЕХНІКА</Text>
        </View>
        <Text style={styles.appName}>FirstMobileApp</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#f0f0f0',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  logoContainer: {
    // Стилі для контейнера лого
  },
  logo: {
    width: 40, // Налаштуй розміри
    height: 40, // Налаштуй розміри
    marginRight: 5,
  },
  logoText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default AppHeader;