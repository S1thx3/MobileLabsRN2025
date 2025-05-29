// screens/SafetyScreen.js
import React from 'react';
import { ScrollView, TouchableOpacity, Linking } from 'react-native'; // Linking для відкриття посилань
import styled from 'styled-components/native';
import { useAppTheme } from '../contexts/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons'; // Для іконок

const ScreenContainer = styled(ScrollView)` /* Використовуємо ScrollView, оскільки контент може бути довгим */
  flex: 1;
  background-color: ${props => props.theme.background};
`;

const ContentPadding = styled.View`
  padding: 20px;
`;

const Section = styled.View`
  margin-bottom: 30px;
  background-color: ${props => props.theme.cardBackground};
  border-radius: 8px;
  padding: 15px;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme.text};
  margin-bottom: 10px;
`;

const DescriptionText = styled.Text`
  font-size: 15px;
  line-height: 22px;
  color: ${props => props.theme.text};
  margin-bottom: 15px;
`;

const CodeContainer = styled.View`
  background-color: ${props => props.theme.background}; /* Трохи інший фон для виділення */
  padding: 20px;
  border-radius: 5px;
  align-items: center;
  margin-bottom: 15px;
`;

const SteamGuardCode = styled.Text`
  font-size: 36px;
  font-weight: bold;
  color: ${props => props.theme.primary}; /* Або інший яскравий колір для коду */
  letter-spacing: 5px; /* Розрідження букв для коду */
`;

const InfoText = styled.Text`
  font-size: 13px;
  color: ${props => props.theme.tabBarInactive};
  text-align: center;
  margin-bottom: 20px;
`;

const ActionButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 15px 0; /* Тільки вертикальний паддінг, якщо немає фону */
  /* border-bottom-width: 1px; */ /* Можна додати розділювач, якщо потрібно */
  /* border-bottom-color: ${props => props.theme.background}; */
`;

const ActionButtonText = styled.Text`
  font-size: 17px;
  color: ${props => props.theme.primary}; /* Колір для кнопок дій */
  margin-left: 10px;
  flex: 1;
`;

const SafetyScreen = () => {
  const { theme } = useAppTheme();

  // Функції-заглушки для кнопок
  const handleRemoveAuthenticator = () => {
    console.log('Remove Authenticator pressed');
    // Тут буде логіка видалення
  };

  const handleShowRecoveryCode = () => {
    console.log('My Recovery Code pressed');
    // Тут буде логіка показу коду відновлення
  };

  const handleHelpPress = () => {
    // Приклад відкриття посилання
    Linking.openURL('https://help.steampowered.com/').catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScreenContainer>
      <ContentPadding>
        <Section>
          <SectionTitle>Steam Guard</SectionTitle>
          <DescriptionText>
            Your account is currently protected by the Steam Guard Mobile Authenticator.
          </DescriptionText>
          <CodeContainer>
            <SteamGuardCode>N5KCV</SteamGuardCode> {/* Приклад коду */}
          </CodeContainer>
          <InfoText>
            You'll enter your code each time you enter your password to sign in to your Steam account.
          </InfoText>
          <InfoText>
            Tip: If you don't share your PC, you can select "Remember my password" when you sign in to the PC client to enter your password and authenticator code less often.
          </InfoText>
        </Section>

        <Section>
          <ActionButton onPress={handleRemoveAuthenticator}>
            <Ionicons name="shield-remove-outline" size={24} color={theme.primary} />
            <ActionButtonText>Remove Authenticator</ActionButtonText>
            <Ionicons name="chevron-forward-outline" size={24} color={theme.tabBarInactive} />
          </ActionButton>
          <ActionButton onPress={handleShowRecoveryCode}>
            <Ionicons name="key-outline" size={24} color={theme.primary} />
            <ActionButtonText>My Recovery Code</ActionButtonText>
            <Ionicons name="chevron-forward-outline" size={24} color={theme.tabBarInactive} />
          </ActionButton>
          <ActionButton onPress={handleHelpPress}>
            <Ionicons name="help-circle-outline" size={24} color={theme.primary} />
            <ActionButtonText>Help</ActionButtonText>
            <Ionicons name="chevron-forward-outline" size={24} color={theme.tabBarInactive} />
          </ActionButton>
        </Section>
      </ContentPadding>
    </ScreenContainer>
  );
};

export default SafetyScreen;