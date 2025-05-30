// screens/MainGameScreen.js
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, Alert } from 'react-native';
import {
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  State, // Важливо для перевірки стану жесту
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS, // Для виклику JS функцій з UI потоку
} from 'react-native-reanimated';
import { useGame } from '../contexts/GameContext'; // Наш хук для доступу до стану гри

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const OBJECT_SIZE = 100; // Розмір нашого інтерактивного об'єкта

const MainGameScreen = () => {
  const { score, addScore, updateTaskProgress } = useGame();

  // Початкова позиція об'єкта
  const initialX = (SCREEN_WIDTH - OBJECT_SIZE) / 2;
  const initialY = 150; // Відступ від лічильника, щоб об'єкт був видний

  // Shared values для анімованої позиції
  const translateX = useSharedValue(initialX);
  const translateY = useSharedValue(initialY);

  // Shared values для збереження позиції перед початком перетягування (для контексту PanGestureHandler)
  // Ці prevTranslateX/Y зараз не використовуються в логіці onPanGestureEvent,
  // оскільки context.startX/Y робить те саме, але їх можна залишити для майбутнього.
  // const prevTranslateX = useSharedValue(initialX);
  // const prevTranslateY = useSharedValue(initialY);

  // Посилання для розрізнення одинарного та подвійного тапу
  const doubleTapRef = useRef(null);

  // Обробник ОДИНАРНОГО тапу
  const onSingleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log('Single Tap Activated!');
      runOnJS(addScore)(1); // Додаємо 1 очко
      runOnJS(updateTaskProgress)('singleTap');
    }
  };

  // Обробник ПОДВІЙНОГО тапу
  const onDoubleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log('Double Tap Activated!');
      runOnJS(addScore)(2); // Додаємо 2 очки (або іншу кількість за завданням)
      runOnJS(updateTaskProgress)('doubleTap');
    }
  };

  // Обробник ДОВГОГО НАТИСКАННЯ
  const onLongPress = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log('Long Press Activated!');
      const bonusPoints = 10; // Наприклад, 10 бонусних очок
      runOnJS(addScore)(bonusPoints);
      runOnJS(updateTaskProgress)('longPress');
      runOnJS(Alert.alert)('Бонус!', `Ви отримали ${bonusPoints} бонусних очок за утримання!`);
    }
  };

  // Обробник для PanGestureHandler (перетягування)
  const onPanGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      // Зберігаємо початкову позицію об'єкта при старті перетягування
      context.startX = translateX.value;
      context.startY = translateY.value;
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
      // Нижній край (враховуємо висоту, наприклад, для таб-бару та хедера)
      // Ці значення можуть потребувати підгонки
      const bottomBoundary = SCREEN_HEIGHT - OBJECT_SIZE - (Platform.OS === 'ios' ? 90 : 70); // Приблизна висота таб-бару + невеликий відступ
      if (translateY.value > bottomBoundary) {
         translateY.value = bottomBoundary;
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
      // Після завершення перетягування, оновлюємо прогрес завдання
      runOnJS(updateTaskProgress)('pan');
      console.log('Pan Gesture Ended');
      // Немає потреби оновлювати prevTranslateX/Y тут, якщо onStart завжди бере поточні translateX/Y.value
    },
  });

  // Анімований стиль для об'єкта (позиція)
  const animatedObjectStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        // { scale: scale.value }, // Розкоментуємо для PinchGesture
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Очки: {score}</Text>

      <PanGestureHandler
        onGestureEvent={onPanGestureEvent}
        activeOffsetX={[-10, 10]} // Дозволяє тапам спрацьовувати, якщо рух по X незначний
        activeOffsetY={[-10, 10]} // Дозволяє тапам спрацьовувати, якщо рух по Y незначний
      >
        <Animated.View> {/* Цей View потрібен для PanGestureHandler, щоб він мав на що діяти */}
          <LongPressGestureHandler
            onHandlerStateChange={onLongPress}
            minDurationMs={3000} // 3 секунди
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
                {/* Інтерактивний об'єкт */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center', // Закоментовано, щоб scoreText був по центру, а об'єкт вільно рухався
    paddingTop: Platform.OS === 'android' ? 30 : 50, // Збільшив відступ для iOS
    backgroundColor: '#f0f8ff', // AliceBlue для фону
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center', // Щоб текст очок був по центру
    marginBottom: 20,
  },
  interactiveObject: {
    width: OBJECT_SIZE,
    height: OBJECT_SIZE,
    backgroundColor: 'deepskyblue', // Змінив колір
    borderRadius: OBJECT_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Дуже важливо для позиціонування через transform
    // Початкова позиція встановлюється через useSharedValue для translateX/Y
  },
  objectText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MainGameScreen;