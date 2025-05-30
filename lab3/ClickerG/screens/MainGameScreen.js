// screens/MainGameScreen.js
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, Alert } from 'react-native';
import { TapGestureHandler, LongPressGestureHandler, PanGestureHandler, State } from 'react-native-gesture-handler';
// Animated та reanimated компоненти для майбутніх жестів (Pan, Pinch)
import Animated, { useSharedValue, useAnimatedStyle, runOnJS, useAnimatedGestureHandler, withDecay } from 'react-native-reanimated';
import { useGame } from '../contexts/GameContext'; // Наш хук для доступу до стану гри

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const OBJECT_SIZE = 100; // Розмір нашого інтерактивного об'єкта

// screens/MainGameScreen.js
// ... (імпорти та константи OBJECT_SIZE, SCREEN_WIDTH) ...

const MainGameScreen = () => {
  const { score, addScore, updateTaskProgress } = useGame();

  const initialX = (SCREEN_WIDTH - OBJECT_SIZE) / 2;
  const initialY = 150;

  const translateX = useSharedValue(initialX);
  const translateY = useSharedValue(initialY);
  const prevTranslateX = useSharedValue(initialX); // Для збереження попередньої позиції
  const prevTranslateY = useSharedValue(initialY); // Для збереження попередньої позиції


  const doubleTapRef = useRef(null);

  const onSingleTap = (event) => { /* ... (без змін) ... */ };
  const onDoubleTap = (event) => { /* ... (без змін) ... */ };
  const onLongPress = (event) => { /* ... (без змін) ... */ };

  // Обробник для PanGestureHandler (перетягування)
  const onPanGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      // Зберігаємо початкову позицію об'єкта при старті перетягування
      context.startX = translateX.value;
      context.startY = translateY.value;
      // Позначимо, що завдання "Перетягнути об'єкт" виконано (якщо ще не виконано)
      // Це краще робити в onEnd або onActive, щоб зафіксувати сам факт перетягування
    },
    onActive: (event, context) => {
      // Оновлюємо позицію об'єкта на основі зміщення від початкової точки
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;

      // Обмеження, щоб об'єкт не виходив за межі екрана (приблизно)
      // Верхній край
      if (translateY.value < 0) {
        translateY.value = 0;
      }
      // Нижній край (враховуємо висоту статус-бару та таб-бару, якщо потрібно точніше)
      if (translateY.value > SCREEN_HEIGHT - OBJECT_SIZE - 100) { // -100 приблизно для таб-бару та хедера
         translateY.value = SCREEN_HEIGHT - OBJECT_SIZE - 100;
      }
      // Лівий край
      if (translateX.value < 0) {
        translateX.value = 0;
      }
      // Правий край
      if (translateX.value > SCREEN_WIDTH - OBJECT_SIZE) {
        translateX.value = SCREEN_WIDTH - OBJECT_SIZE;
      }
    },
    onEnd: () => {
      // Після завершення перетягування, можна оновити прогрес завдання
      runOnJS(updateTaskProgress)('pan');
      console.log('Pan Gesture Ended');
      // Зберігаємо нову "базову" позицію
      prevTranslateX.value = translateX.value;
      prevTranslateY.value = translateY.value;
    },
  });

  const animatedObjectStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        // { scale: scale.value }, // Поки закоментовано
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Очки: {score}</Text>

      {/* PanGestureHandler обгортає все, що ми хочемо зробити перетягуваним */}
      <PanGestureHandler onGestureEvent={onPanGestureEvent}>
        <Animated.View> {/* Додаткова Animated.View для PanGestureHandler */}
          <LongPressGestureHandler
            onHandlerStateChange={onLongPress}
            minDurationMs={3000}
          >
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
                  <Text style={styles.objectText}>Drag Me!</Text>
                </Animated.View>
              </TapGestureHandler>
            </TapGestureHandler>
          </LongPressGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

// ... (стилі залишаються ті самі, але оновимо container та interactiveObject) ...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center', // Забираємо, щоб scoreText був зверху, а об'єкт міг рухатись вільно
    paddingTop: Platform.OS === 'android' ? 25 : 50,
    backgroundColor: '#f0f8ff',
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'center', // Центруємо текст очків
    marginBottom: 20,   // Зменшимо відступ, бо об'єкт тепер позиціонується абсолютно
  },
  interactiveObject: {
    width: OBJECT_SIZE,
    height: OBJECT_SIZE,
    backgroundColor: 'deepskyblue', // Змінимо колір для наочності
    borderRadius: OBJECT_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Важливо для позиціонування через transform
    // Початкова позиція тепер задається через translateX.value та translateY.value
  },
  objectText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MainGameScreen;