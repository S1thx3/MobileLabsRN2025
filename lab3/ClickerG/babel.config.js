// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Додай сюди плагін для Reanimated, коли будеш готовий
      // 'react-native-reanimated/plugin',
    ],
  };
};