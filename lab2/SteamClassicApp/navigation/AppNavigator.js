
import React from 'react'; // useContext тут не потрібен, якщо тема для таб-бару береться через Styled Components напряму
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

// Екрани
import StoreScreen from '../screens/StoreScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ChatScreen from '../screens/ChatScreen';
import SafetyScreen from '../screens/SafetyScreen';
import ProfileScreen from '../screens/ProfileScreen';



import { useAppTheme } from '../contexts/ThemeContext'; // Імпортуємо хук

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { theme } = useAppTheme(); // Отримуємо поточний об'єкт теми

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // headerShown: true, // За замовчуванням true, можна налаштувати
        headerStyle: {
          backgroundColor: theme.cardBackground,
        },
        headerTitleStyle: {
          color: theme.text,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Store') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Community') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Safety') {
            iconName = focused ? 'shield-checkmark' : 'shield-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.tabBarActive,
        tabBarInactiveTintColor: theme.tabBarInactive,
        tabBarStyle: {
          backgroundColor: theme.tabBarBackground,
          borderTopColor: theme.tabBarBackground, // Можна налаштувати колір лінії
        },
      })}
    >
      <Tab.Screen name="Store" component={StoreScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Safety" component={SafetyScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;