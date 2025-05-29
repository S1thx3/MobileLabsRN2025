// screens/StoreScreen.js
import React from 'react';
import { FlatList, ScrollView } from 'react-native'; // ScrollView для загального скролу, FlatList для списків
import styled from 'styled-components/native';
import { useAppTheme } from '../contexts/ThemeContext';
import GameCard from '../components/GameCard'; // Імпортуємо нашу картку

// Styled Components для StoreScreen
const ScreenContainer = styled(ScrollView)` /* Використовуємо ScrollView, щоб весь екран скролився */
  flex: 1;
  background-color: ${props => props.theme.background};
`;

const ContentPadding = styled.View`
  padding: 15px;
`;

const FeaturedGameContainer = styled.View`
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
`;

const FeaturedGameImage = styled.Image`
  width: 100%;
  height: 220px; /* Висота для головного банера */
`;

const FeaturedGameTitle = styled.Text`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  background-color: rgba(0,0,0,0.5); /* Напівпрозорий фон для тексту */
  padding: 5px;
  border-radius: 5px;
`;

const SectionTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${props => props.theme.text};
  margin-bottom: 10px;
  margin-top: 15px;
`;

// Мок-дані (тимчасові дані для відображення)
const featuredGameData = {
  id: 'featured1',
  title: 'Dead by Daylight',
  imageUrl: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/381210/capsule_616x353.jpg?t=1746584187', // Заміни на реальне посилання або локальний ресурс
};

const gamesData = [
  { id: '1', title: 'Grand Theft Auto V', platforms: ['Windows'], currentPrice: '$10', oldPrice: '$20', imageUrl: 'https://www.notebookcheck-ru.com/fileadmin/Notebooks/News/_nc4/GTA5Logo.jpg' },
  { id: '2', title: 'Battlefield 4', platforms: ['Windows'], currentPrice: '$35', imageUrl: 'https://gaming-cdn.com/images/products/185/orig/battlefield-4-pc-game-ea-app-cover.jpg?v=1707146102' },
  { id: '3', title: 'Factorio', platforms: ['Windows', 'Mac'], currentPrice: '$7', imageUrl: 'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000056818/c700b4cc22a81c2099335d83fe379e9cdc6afd190a9985f74ba8f7e589f4ffd2' },
  { id: '4', title: 'Horizon Zero Dawn', platforms: ['Windows'], currentPrice: '$38', imageUrl: 'https://cdn1.epicgames.com/3328b08ac1c14540aa265a1a85c07839/offer/hzd_wide-2560x1440-bd312be05c49cf339097777c493cb899.jpg' },
  // Додай більше ігор
];

const StoreScreen = () => {
  const { theme } = useAppTheme(); // Отримуємо об'єкт теми для доступу до кольорів

  const renderGameItem = ({ item }) => (
    <GameCard game={item} onPress={() => console.log('Pressed game:', item.title)} />
  );

  return (
    <ScreenContainer>
      <ContentPadding>
        {/* Головна гра/банер */}
        <FeaturedGameContainer>
          <FeaturedGameImage source={{ uri: featuredGameData.imageUrl }} />
          <FeaturedGameTitle>{featuredGameData.title}</FeaturedGameTitle>
        </FeaturedGameContainer>

        {/* Тут можна додати кнопки/фільтри категорій "Top Sellers", "Free to play" */}
        {/* Наприклад:
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
          <Button title="Top Sellers" onPress={() => {}} />
          <Button title="Free to play" onPress={() => {}} />
          <Button title="Early Access" onPress={() => {}} />
        </View>
        */}

        <SectionTitle>Popular Games</SectionTitle>
        <FlatList
          data={gamesData}
          renderItem={renderGameItem}
          keyExtractor={item => item.id}
          // FlatList всередині ScrollView може мати проблеми з прокруткою,
          // якщо список дуже довгий. Якщо так, можна зробити весь екран FlatList
          // і додати FeaturedGameContainer та SectionTitle як ListHeaderComponent.
          // Для простоти поки що так.
          scrollEnabled={false} // Оскільки зовнішній ScrollView вже є
        />
      </ContentPadding>
    </ScreenContainer>
  );
};

export default StoreScreen;