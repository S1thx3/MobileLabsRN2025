// navigation/AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import MainGameScreen from '../screens/MainGameScreen';
import TasksScreen from '../screens/TasksScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Game') {
            iconName = focused ? 'game-controller' : 'game-controller-outline';
          } else if (route.name === 'Tasks') {
            iconName = focused ? 'list-circle' : 'list-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato', // Тимчасові кольори
        tabBarInactiveTintColor: 'gray', // Тимчасові кольори
        headerStyle: { // Тимчасові стилі хедера
          backgroundColor: '#f0f0f0',
        },
        headerTitleStyle: {
          color: '#333',
        }
      })}
    >
      <Tab.Screen name="Game" component={MainGameScreen} options={{ title: 'Гра-Клікер' }} />
      <Tab.Screen name="Tasks" component={TasksScreen} options={{ title: 'Завдання' }} />
    </Tab.Navigator>
  );
};

export default AppNavigator;