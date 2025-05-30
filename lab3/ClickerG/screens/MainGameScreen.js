// screens/MainGameScreen.js
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, Alert } from 'react-native';
import { TapGestureHandler, LongPressGestureHandler, State } from 'react-native-gesture-handler';
// Animated та reanimated компоненти для майбутніх жестів (Pan, Pinch)
import Animated, { useSharedValue, useAnimatedStyle, runOnJS } from 'react-native-reanimated';
import { useGame } from '../contexts/GameContext'; // Наш хук для доступу до стану гри

const SCREEN_WIDTH = Dimensions.get('window').width;
const OBJECT_SIZE = 100; // Розмір нашого інтерактивного об'єкта

// screens/MainGameScreen.js
// ... (імпорти та константи OBJECT_SIZE, SCREEN_WIDTH) ...

const MainGameScreen = () => {
  const { score, addScore, updateTaskProgress } = useGame();

  const translateX = useSharedValue((SCREEN_WIDTH - OBJECT_SIZE) / 2);
  const translateY = useSharedValue(150);
  // const scale = useSharedValue(1); // Поки закоментовано

  const doubleTapRef = useRef(null);

  const onSingleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log('Single Tap Activated!');
      runOnJS(addScore)(1);
      runOnJS(updateTaskProgress)('singleTap');
    }
  };

  const onDoubleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log('Double Tap Activated!');
      runOnJS(addScore)(2); // За завданням подвійний клік дає подвійну кількість очок
      runOnJS(updateTaskProgress)('doubleTap');
    }
  };

  // Обробник для довгого натискання
  const onLongPress = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log('Long Press Activated!');
      const bonusPoints = 10; // Наприклад, 10 бонусних очок
      runOnJS(addScore)(bonusPoints);
      runOnJS(updateTaskProgress)('longPress'); // Оновлюємо прогрес завдання для довгого натискання
      // Можна показати повідомлення
      runOnJS(Alert.alert)('Бонус!', `Ви отримали ${bonusPoints} бонусних очок за утримання!`);
    }
  };

  const animatedObjectStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        // { scale: scale.value },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Очки: {score}</Text>

      {/* Обгортаємо все в LongPressGestureHandler */}
      <LongPressGestureHandler
        onHandlerStateChange={onLongPress}
        minDurationMs={3000} // 3000 мс = 3 секунди, як у завданні [cite: 7]
      >
        {/* Вкладені TapGestureHandlers */}
        <TapGestureHandler
          ref={doubleTapRef}
          onHandlerStateChange={onDoubleTap}
          numberOfTaps={2}
        >
          <TapGestureHandler
            waitFor={doubleTapRef}
            onHandlerStateChange={onSingleTap}
            numberOfTaps={1}
          >
            <Animated.View style={[styles.interactiveObject, animatedObjectStyle]}>
              <Text style={styles.objectText}>Tap Me!</Text>
            </Animated.View>
          </TapGestureHandler>
        </TapGestureHandler>
      </LongPressGestureHandler>
    </View>
  );
};

// ... (стилі залишаються ті самі) ...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 50,
    backgroundColor: '#f0f8ff',
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 50,
  },
  interactiveObject: {
    width: OBJECT_SIZE,
    height: OBJECT_SIZE,
    backgroundColor: 'tomato',
    borderRadius: OBJECT_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  objectText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MainGameScreen;