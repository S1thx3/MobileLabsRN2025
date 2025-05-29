// screens/CommunityScreen.js
import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useAppTheme } from '../contexts/ThemeContext';
import NewsPostCard from '../components/NewsPostCard'; // Імпортуємо картку посту

const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

const ListPadding = styled.View`
  padding: 10px; /* Відступи для списку */
`;

// Мок-дані для стрічки спільноти
const communityPostsData = [
  {
    id: 'post1',
    authorName: 'Eurogamer',
    authorAvatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVzdxX6cZ5CrZJl1rE6FvzVT5_GFb11AZ9Cg&s',
    date: 'yesterday - 2:20 pm',
    title: 'Kingdom Come: Deliverance - Огляд',
    excerpt: 'Розглядаємо детально нове доповнення та основні аспекти гри, що завоювала серця гравців...',
    imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202408/0108/4b36f4db68a6110b2a035b4a5631c983177d9626490497c7.png', // Заміни
    likes: 324,
    comments: 12,
  },
  {
    id: 'post2',
    authorName: 'GameSpot',
    authorAvatarUrl: 'https://i.pinimg.com/736x/71/81/14/7181149979b9cc345415d3b6465b192b.jpg',
    date: '2 days ago - 10:00 am',
    title: 'Нові чутки про наступну гру від Rockstar',
    excerpt: 'Інсайдери повідомляють про можливі деталі та сеттінг майбутнього хіта...',
    imageUrl: null, // Пост без головного зображення
    likes: 587,
    comments: 45,
  },
  // Додай більше постів
];


const CommunityScreen = () => {
  const { theme } = useAppTheme();

  const renderPostItem = ({ item }) => (
    <NewsPostCard post={item} onPress={() => console.log('Pressed post:', item.title)} />
  );

  return (
    <ScreenContainer>
      <FlatList
        data={communityPostsData}
        renderItem={renderPostItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 10 }} // Відступи для вмісту FlatList
        // Тут пізніше можна буде додати ListHeaderComponent для фільтрів ("All", "Screenshots", "Artwork")
      />
    </ScreenContainer>
  );
};

export default CommunityScreen;