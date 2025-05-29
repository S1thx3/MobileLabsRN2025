// screens/StoreScreen.js
import React from 'react';
import { View, Text } from 'react-native'; // Імпортуємо Text
import styled from 'styled-components/native';
import { useAppTheme } from '../contexts/ThemeContext'; // Імпортуємо хук

const ScreenContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.background};
`;

const ScreenText = styled.Text`
  color: ${props => props.theme.text};
  font-size: 20px;
`;

const ProfileScreen = () => {
  const { themeName } = useAppTheme();
  return (
    <ScreenContainer>
      <ScreenText>Store Screen (Theme: {themeName})</ScreenText>
    </ScreenContainer>
  );
};
export default ProfileScreen;