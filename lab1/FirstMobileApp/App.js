import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Іконки (встановіть, якщо ще не встановлено: expo install @expo/vector-icons)
import Ionicons from '@expo/vector-icons/Ionicons';


// Екрани
import HomeScreen from './screens/HomeScreen';
import GalleryScreen from './screens/GalleryScreen';
import ProfileScreen from './screens/ProfileScreen';

// Загальні компоненти
import AppHeader from './components/Header';
import AppFooter from './components/Footer';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <AppHeader />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false, // Ховаємо стандартний заголовок навігатора, бо у нас є AppHeader
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Головна') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Фотогалерея') {
                iconName = focused ? 'images' : 'images-outline';
              } else if (route.name === 'Профіль') {
                iconName = focused ? 'person' : 'person-outline';
              }
              // Ти можеш використовувати будь-яку бібліотеку іконок або власні зображення
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007bff', // Колір активної вкладки
            tabBarInactiveTintColor: 'gray',   // Колір неактивної вкладки
            tabBarStyle: {
                // backgroundColor: '#f0f0f0', // Колір фону таб-бару
            }
          })}
        >
          <Tab.Screen name="Головна" component={HomeScreen} />
          <Tab.Screen name="Фотогалерея" component={GalleryScreen} />
          <Tab.Screen name="Профіль" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      <AppFooter />
    </SafeAreaProvider>
  );
}

// Стилі, якщо потрібні для App.js, але основні стилі в компонентах
// const styles = StyleSheet.create({
//   // ...
// });