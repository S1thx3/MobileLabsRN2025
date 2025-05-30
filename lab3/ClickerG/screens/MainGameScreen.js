// screens/MainGameScreen.js
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, Alert } from 'react-native';
import {
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import { useGame } from '../contexts/GameContext';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const OBJECT_SIZE = 100;

const MainGameScreen = () => {
  const { score, addScore, updateTaskProgress } = useGame();

  const initialX = (SCREEN_WIDTH - OBJECT_SIZE) / 2;
  const initialY = 150;

  const translateX = useSharedValue(initialX);
  const translateY = useSharedValue(initialY);

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const doubleTapRef = useRef(null);

  // Обробник ОДИНАРНОГО тапу
  const onSingleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log('Single Tap Activated!');
      runOnJS(addScore)(1);
      runOnJS(updateTaskProgress)('singleTap');
    }
  };

  // Обробник ПОДВІЙНОГО тапу
  const onDoubleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log('Double Tap Activated!');
      runOnJS(addScore)(2);
      runOnJS(updateTaskProgress)('doubleTap');
    }
  };

  // Обробник ДОВГОГО НАТИСКАННЯ
  const onLongPress = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log('Long Press Activated!');
      const bonusPoints = 10;
      runOnJS(addScore)(bonusPoints);
      runOnJS(updateTaskProgress)('longPress');
      runOnJS(Alert.alert)('Бонус!', `Ви отримали ${bonusPoints} бонусних очок за утримання!`);
    }
  };

  // Обробник для PanGestureHandler (перетягування)
  const onPanGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;

      // Оновлені обмеження з урахуванням масштабу
      const currentObjectSize = OBJECT_SIZE * scale.value;
      const bottomBoundary = SCREEN_HEIGHT - currentObjectSize - (Platform.OS === 'ios' ? 90 : 70);
      const rightBoundary = SCREEN_WIDTH - currentObjectSize;

      if (translateY.value < 0) translateY.value = 0;
      if (translateY.value > bottomBoundary) translateY.value = bottomBoundary;
      if (translateX.value < 0) translateX.value = 0;
      if (translateX.value > rightBoundary) translateX.value = rightBoundary;
    },
    onEnd: () => {
      runOnJS(updateTaskProgress)('pan');
      console.log('Pan Gesture Ended');
    },
  });

  // Обробник для PinchGestureHandler (масштабування)
  const onPinchGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startScale = savedScale.value; // Використовуємо savedScale для коректного продовження масштабування
    },
    onActive: (event, context) => {
      scale.value = context.startScale * event.scale;
      scale.value = Math.max(0.5, Math.min(scale.value, 3));
    },
    onEnd: () => {
      savedScale.value = scale.value;
      const bonusPoints = 5;
      runOnJS(addScore)(bonusPoints);
      runOnJS(updateTaskProgress)('pinch');
      runOnJS(Alert.alert)('Масштаб змінено!', `Бонус +${bonusPoints} очок!`);
      console.log('Pinch Gesture Ended, scale:', scale.value);
    },
  });

  // Анімований стиль, що включає позицію та масштаб
  const animatedObjectStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Очки: {score}</Text>

      <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
        <Animated.View>
          <PanGestureHandler
            onGestureEvent={onPanGestureEvent}
            activeOffsetX={[-10, 10]}
            activeOffsetY={[-10, 10]}
          >
            <Animated.View>
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
                      <Text style={styles.objectText}>Interact!</Text>
                    </Animated.View>
                  </TapGestureHandler>
                </TapGestureHandler>
              </LongPressGestureHandler>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </PinchGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 50,
    backgroundColor: '#f0f8ff',
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  interactiveObject: {
    width: OBJECT_SIZE,
    height: OBJECT_SIZE,
    backgroundColor: 'mediumpurple',
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