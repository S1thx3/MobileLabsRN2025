// App.js
import 'react-native-gesture-handler'; // МАЄ БУТИ НА САМОМУ ВЕРСІ!
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // <--- 1. ІМПОРТУЙ ЦЕЙ КОМПОНЕНТ
import AppNavigator from './navigation/AppNavigator';
import { GameProvider } from './contexts/GameContext';

export default function App() {
  return (
    // 2. ОБГОРНИ ВСЕ В GestureHandlerRootView
    // Важливо, щоб GestureHandlerRootView був якомога вище, але після SafeAreaProvider,
    // щоб жести коректно обробляли відступи. Або навпаки, залежно від потреб,
    // але зазвичай SafeAreaProvider -> GestureHandlerRootView -> NavigationContainer.
    // Давай спробуємо так:
    <GestureHandlerRootView style={{ flex: 1 }}> 
      <SafeAreaProvider>
        <GameProvider>
          <StatusBar style="auto" />
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </GameProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}