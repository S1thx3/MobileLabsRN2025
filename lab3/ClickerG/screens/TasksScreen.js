// screens/TasksScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, Platform } from 'react-native';
import { useGame } from '../contexts/GameContext'; // Наш хук для доступу до стану гри
import Ionicons from '@expo/vector-icons/Ionicons'; // Для іконок статусу

// Компонент для відображення одного завдання у списку
const TaskItem = ({ task }) => {
  const progressPercent = task.target > 0 ? (task.current / task.target) * 100 : 0;

  return (
    <View style={styles.taskItemContainer}>
      <View style={styles.taskInfo}>
        <Text style={styles.taskText}>{task.text}</Text>
        <Text style={styles.taskDescription}>{task.description}</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progressPercent}%` }]} />
        </View>
        <Text style={styles.taskProgressText}>
          {task.current} / {task.target}
        </Text>
      </View>
      <View style={styles.taskStatusIcon}>
        {task.completed ? (
          <Ionicons name="checkmark-circle" size={30} color="green" />
        ) : (
          <Ionicons name="ellipse-outline" size={30} color="gray" />
        )}
      </View>
    </View>
  );
};

const TasksScreen = () => {
  const { tasks } = useGame(); // Отримуємо список завдань з контексту

  const renderTaskItem = ({ item }) => <TaskItem task={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Список Завдань</Text>
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Світлий фон для сторінки завдань
    paddingTop: Platform.OS === 'android' ? 25 : 40,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContentContainer: {
    paddingHorizontal: 15,
  },
  taskItemContainer: {
    backgroundColor: '#ffffff', // Білий фон для картки завдання
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2, // Тінь для Android
    shadowColor: '#000', // Тінь для iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  taskInfo: {
    flex: 1,
    marginRight: 10,
  },
  taskText: {
    fontSize: 17,
    fontWeight: '600', // Напівжирний
    color: '#333',
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden', // Щоб progressBar не виходив за межі
    marginBottom: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'deepskyblue', // Колір прогресу
  },
  taskProgressText: {
    fontSize: 12,
    color: '#888',
    alignSelf: 'flex-end', // Показувати прогрес справа
  },
  taskStatusIcon: {
    marginLeft: 10, // Відступ для іконки статусу
  },
});

export default TasksScreen;