// screens/MainGameScreen.js
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
// Animated та reanimated компоненти для майбутніх жестів (Pan, Pinch)
import Animated, { useSharedValue, useAnimatedStyle, runOnJS } from 'react-native-reanimated';
import { useGame } from '../contexts/GameContext'; // Наш хук для доступу до стану гри

const SCREEN_WIDTH = Dimensions.get('window').width;
const OBJECT_SIZE = 100; // Розмір нашого інтерактивного об'єкта

const MainGameScreen = () => {
  const { score, addScore, updateTaskProgress } = useGame();

  // Початкова позиція об'єкта (для майбутнього перетягування)
  // Поки що розмістимо його приблизно по центру горизонтально і трохи нижче лічильника
  const initialX = (SCREEN_WIDTH - OBJECT_SIZE) / 2;
  const initialY = 150; // Відступ від лічильника

  // Shared values для анімованої позиції (будуть використовуватися з PanGestureHandler)
  const translateX = useSharedValue(initialX);
  const translateY = useSharedValue(initialY);

  // Shared value для масштабу (буде використовуватися з PinchGestureHandler)
  // const scale = useSharedValue(1); // Поки закоментовано

  // Посилання для розрізнення одинарного та подвійного тапу
  const doubleTapRef = useRef(null);

  // Обробник ОДИНАРНОГО тапу
  const onSingleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log('Single Tap Activated!');
      runOnJS(addScore)(1); // Додаємо 1 очко
      runOnJS(updateTaskProgress)('singleTap'); // Оновлюємо прогрес завдання для одинарного тапу
    }
  };

  // Обробник ПОДВІЙНОГО тапу
  const onDoubleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log('Double Tap Activated!');
      runOnJS(addScore)(2); // Додаємо 2 очки (або іншу кількість за завданням)
      runOnJS(updateTaskProgress)('doubleTap'); // Оновлюємо прогрес завдання для подвійного тапу
    }
  };

  // Анімований стиль для об'єкта (поки що тільки позиція)
  const animatedObjectStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        // { scale: scale.value }, // Розкоментуємо для PinchGesture
      ],
      // Важливо для Android, щоб жести працювали на View з position: 'absolute'
      // elevation: 5, // Можна додати, якщо будуть проблеми з "пропусканням" жестів
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Очки: {score}</Text>

      {/* Контейнер для жестів. Порядок важливий для розрізнення тапів. */}
      {/* Спочатку обробник для подвійного тапу */}
      <TapGestureHandler
        ref={doubleTapRef}
        onHandlerStateChange={onDoubleTap}
        numberOfTaps={2} // Кількість натискань для активації
      >
        {/* Потім обробник для одинарного тапу, який "чекає" на провал подвійного */}
        <TapGestureHandler
          waitFor={doubleTapRef} // Спрацює, тільки якщо подвійний тап не відбувся
          onHandlerStateChange={onSingleTap}
          numberOfTaps={1}
        >
          {/* Наш інтерактивний об'єкт */}
          <Animated.View style={[styles.interactiveObject, animatedObjectStyle]}>
            <Text style={styles.objectText}>Tap!</Text>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>

      {/* Інші обробники жестів (LongPress, Pan, Pinch, Fling) будуть додані сюди пізніше */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Горизонтальне вирівнювання для scoreText
    paddingTop: Platform.OS === 'android' ? 25 : 50, // Відступ зверху, враховуючи статус-бар
    backgroundColor: '#f0f8ff', // Світло-блакитний фон, можна змінити
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 50, // Відступ від лічильника до об'єкта
  },
  interactiveObject: {
    width: OBJECT_SIZE,
    height: OBJECT_SIZE,
    backgroundColor: 'tomato',
    borderRadius: OBJECT_SIZE / 2, // Робить об'єкт круглим
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute' потрібен, щоб об'єкт міг вільно рухатися по всьому екрану,
    // а не тільки в межах потоку елементів. translateX/Y будуть його позиціонувати.
    position: 'absolute',
  },
  objectText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MainGameScreen;