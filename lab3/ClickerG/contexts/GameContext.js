// contexts/GameContext.js
import React, { createContext, useState, useContext, useMemo } from 'react';

// Початковий стан завдань, як описано в лабораторній
const initialTasks = [
  { id: 'task1', text: 'Зробити 10 кліків', target: 10, current: 0, completed: false, type: 'singleTap', description: 'Натиснути на об\'єкт 10 разів.' },
  { id: 'task2', text: 'Зробити подвійний клік 5 разів', target: 5, current: 0, completed: false, type: 'doubleTap', description: 'Використати TapGestureHandler для виконання 5 подвійних кліків.' },
  { id: 'task3', text: 'Утримувати об\'єкт 3 секунди', target: 1, current: 0, completed: false, type: 'longPress', description: 'Використати LongPressGestureHandler для довгого натискання.' }, // target 1 - для позначки виконано/не виконано
  { id: 'task4', text: 'Перетягнути об\'єкт', target: 1, current: 0, completed: false, type: 'pan', description: 'Використати PanGestureHandler, щоб перемістити об\'єкт по екрану.' },
  { id: 'task5', text: 'Зробити свайп вправо', target: 1, current: 0, completed: false, type: 'flingRight', description: 'Використати FlingGestureHandler, щоб зробити швидкий свайп вправо.' },
  { id: 'task6', text: 'Зробити свайп вліво', target: 1, current: 0, completed: false, type: 'flingLeft', description: 'Використати FlingGestureHandler, щоб зробити швидкий свайп вліво.' },
  { id: 'task7', text: 'Змінити розмір об\'єкта', target: 1, current: 0, completed: false, type: 'pinch', description: 'Використати PinchGestureHandler, щоб збільшити або зменшити об\'єкт.' },
  { id: 'task8', text: 'Отримати 100 очок', target: 100, current: 0, completed: false, type: 'score', description: 'Набрати загалом 100 очок у лічильнику.' },
];

export const GameContext = createContext({
  score: 0,
  addScore: (points) => console.warn('addScore not implemented'),
  tasks: initialTasks,
  updateTaskProgress: (taskType, amount = 1) => console.warn('updateTaskProgress not implemented'),
  getTaskByType: (taskType) => undefined, // Функція для отримання завдання за типом
});

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [tasks, setTasks] = useState(initialTasks);

  const addScore = (points) => {
    setScore(prevScore => {
      const newScore = prevScore + points;
      // Оновлюємо прогрес завдання на очки після оновлення стану score
      setTasks(currentTasks => currentTasks.map(task => {
        if (task.type === 'score' && !task.completed) {
          const isCompleted = newScore >= task.target;
          return { ...task, current: Math.min(newScore, task.target), completed: isCompleted };
        }
        return task;
      }));
      return newScore;
    });
  };

  const updateTaskProgress = (taskType, amount = 1) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.type === taskType && !task.completed) {
          // Для завдань, де target=1 (виконано/не виконано), amount ігнорується, просто встановлюємо current=1
          const newCurrent = task.target === 1 ? 1 : task.current + amount;
          const isCompleted = newCurrent >= task.target;
          return { ...task, current: Math.min(newCurrent, task.target), completed: isCompleted };
        }
        return task;
      })
    );
  };

  const getTaskByType = (taskType) => {
    return tasks.find(task => task.type === taskType);
  };

  const contextValue = useMemo(() => ({
    score,
    addScore,
    tasks,
    updateTaskProgress,
    getTaskByType,
  }), [score, tasks]); // tasks додано до залежностей

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);