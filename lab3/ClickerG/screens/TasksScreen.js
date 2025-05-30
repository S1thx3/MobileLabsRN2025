// screens/TasksScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TasksScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tasks Screen</Text>
      {/* Тут буде FlatList із завданнями */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0', // Тимчасовий фон
  },
  text: {
    fontSize: 20,
    color: '#333', // Тимчасовий колір тексту
  }
});

export default TasksScreen;