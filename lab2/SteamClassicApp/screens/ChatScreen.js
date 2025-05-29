
import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useAppTheme } from '../contexts/ThemeContext';
import ChatListItem from '../components/ChatListItem'; 
const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
`;


const chatListData = [
  {
    id: 'chat1',
    userName: 'Максімка',
    avatarUrl: 'https://s00.yaplakal.com/pics/pics_original/4/4/0/19632044.jpg', 
    lastMessage: "Прівєт нубік",
    time: '14 Jun',
    unreadCount: 1,
    userStatus: 'Playing CS:GO', 
  },
  {
    id: 'chat2',
    userName: 'Януш',
    avatarUrl: 'https://s00.yaplakal.com/pics/pics_original/4/4/0/19632044.jpg',
    lastMessage: 'You: Ok',
    time: '14 Jun',
    unreadCount: 0,
    userStatus: null,
  },
  {
    id: 'chat3',
    userName: 'Фєдкус',
    avatarUrl: 'https://s00.yaplakal.com/pics/pics_original/4/4/0/19632044.jpg', 
    lastMessage: 'You: Ok',
    time: '14 Jun',
    unreadCount: 1,
    userStatus: 'Playing Dota 2',
  },
  {
    id: 'chat4',
    userName: 'Player',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYt_h1tYDU8BtLvO7HPNY98wLSRtT_Y8EoJA&s', // Сірий аватар "?"
    lastMessage: 'Hello!',
    time: '12 Jun',
    unreadCount: 3,
    userStatus: 'Offline',
  },
 
];


const ListSeparator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${props => props.theme.background}; /* Колір фону, щоб лінія була тонкою */
`;


const ChatScreen = () => {
  const { theme } = useAppTheme();

  const renderChatItem = ({ item }) => (
    <ChatListItem chat={item} onPress={() => console.log('Pressed chat with:', item.userName)} />
  );

  return (
    <ScreenContainer>
      {}
      <FlatList
        data={chatListData}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <ListSeparator theme={theme} />}
      />
    </ScreenContainer>
  );
};

export default ChatScreen;