// screens/MainGameScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MainGameScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Main Game Screen</Text>
      {/* Тут буде лічильник, об'єкт для жестів тощо */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Тимчасовий фон
  },
  text: {
    fontSize: 20,
    color: '#333', // Тимчасовий колір тексту
  }
});

export default MainGameScreen;