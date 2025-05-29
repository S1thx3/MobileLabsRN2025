// contexts/ThemeContext.js
import React, { createContext, useState, useMemo, useContext } from 'react'; // Додав useContext
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { darkTheme } from '../themes/darkTheme';
import { lightTheme } from '../themes/lightTheme';

export const ThemeContext = createContext({
  themeName: 'dark',
  theme: darkTheme,
  toggleTheme: () => {},
});

export const AppThemeProvider = ({ children }) => {
  const [currentThemeName, setCurrentThemeName] = useState('dark');

  const toggleTheme = () => {
    setCurrentThemeName(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const activeTheme = useMemo(
    () => (currentThemeName === 'dark' ? darkTheme : lightTheme),
    [currentThemeName]
  );

  return (
    <ThemeContext.Provider value={{ themeName: currentThemeName, theme: activeTheme, toggleTheme }}>
      <StyledThemeProvider theme={activeTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Хук для зручного доступу до контексту
export const useAppTheme = () => useContext(ThemeContext);