
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import { AppThemeProvider, useAppTheme } from './contexts/ThemeContext'; 
import AppNavigator from './navigation/AppNavigator'; 


const ThemedStatusBar = () => {
  const { themeName } = useAppTheme(); 
  return <StatusBar style={themeName === 'dark' ? 'light' : 'dark'} />;
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <ThemedStatusBar />
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}