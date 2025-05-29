// screens/ProfileScreen.js
import React from 'react';
import { View, TouchableOpacity, Alert } from 'react-native'; // Alert для підтвердження виходу
import styled from 'styled-components/native';
import { useAppTheme } from '../contexts/ThemeContext'; // Хук для доступу до теми та функції toggleTheme
import Ionicons from '@expo/vector-icons/Ionicons';

const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
  /* padding-top: 40px; */ /* Можливо, потрібен відступ зверху, якщо немає хедера */
`;

const UserInfoSection = styled.View`
  align-items: center;
  padding: 30px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.cardBackground}; /* Ледь помітна лінія */
`;

const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-bottom: 15px;
  /* Тут може бути кастомна іконка Steam з зеленим кружечком статусу */
  /* background-color: #FF5500; // Приклад для заглушки аватарки */
`;

const UserName = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${props => props.theme.text};
  margin-bottom: 5px;
`;

const UserGroup = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.tabBarInactive};
`;

const MenuSection = styled.View`
  margin-top: 20px;
`;

const MenuItem = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 18px 20px;
  background-color: ${props => props.theme.cardBackground};
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.background};
`;

const MenuItemText = styled.Text`
  font-size: 17px;
  color: ${props => props.theme.text};
  margin-left: 15px;
  flex: 1;
`;

const ProfileScreen = () => {
  const { theme, themeName, toggleTheme } = useAppTheme();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: () => console.log("User logged out (simulation)") }
      ]
    );
  };

  // Заміни на реальні дані користувача або заглушки
  const userData = {
    name: 'Alex Lebiga', // Заміни на свої дані або залиш як є для прикладу
    group: 'Group',             // Або "Online", "Offline" тощо
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRctyO4rvgrPRecBcSqCAh2yDGqBDNF9C-2lw&s', 
  };

  return (
    <ScreenContainer>
      <UserInfoSection>
        <Avatar source={{ uri: userData.avatarUrl }} />
        <UserName>{userData.name}</UserName>
        <UserGroup>{userData.group}</UserGroup>
      </UserInfoSection>

      <MenuSection>
        <MenuItem onPress={toggleTheme}>
          <Ionicons name={themeName === 'dark' ? "sunny-outline" : "moon-outline"} size={24} color={theme.text} />
          <MenuItemText>Change Theme (Currently: {themeName})</MenuItemText>
          <Ionicons name="chevron-forward-outline" size={24} color={theme.tabBarInactive} />
        </MenuItem>
        <MenuItem onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={theme.text} />
          <MenuItemText>Logout</MenuItemText>
          <Ionicons name="chevron-forward-outline" size={24} color={theme.tabBarInactive} />
        </MenuItem>
      </MenuSection>
    </ScreenContainer>
  );
};

export default ProfileScreen;