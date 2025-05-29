
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const ItemContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 12px 15px;
  background-color: ${props => props.theme.cardBackground};
  /* Можна додати border-bottom для розділювача, якщо фон контейнера списку інший */
  /* border-bottom-width: 1px; */
  /* border-bottom-color: ${props => props.theme.background}; */
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 15px;
`;

const ChatDetails = styled.View`
  flex: 1;
`;

const UserName = styled.Text`
  color: ${props => props.theme.text};
  font-size: 17px;
  font-weight: bold;
`;

const LastMessage = styled.Text`
  color: ${props => props.theme.tabBarInactive};
  font-size: 14px;
  margin-top: 2px;
`;

const TimeInfo = styled.View`
  align-items: flex-end;
`;

const TimeText = styled.Text`
  color: ${props => props.theme.tabBarInactive};
  font-size: 12px;
`;

const UnreadBadge = styled.View`
  background-color: ${props => props.theme.primary};
  border-radius: 10px;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;

const UnreadText = styled.Text`
  color: ${props => props.theme.cardBackground}; /* Або інший контрастний колір */
  font-size: 10px;
  font-weight: bold;
`;


const ChatListItem = ({ chat, onPress }) => {
  return (
    <ItemContainer onPress={onPress}>
      <Avatar source={{ uri: chat.avatarUrl }} />
      <ChatDetails>
        <UserName>{chat.userName}</UserName>
        <LastMessage numberOfLines={1} ellipsizeMode="tail">
          {chat.lastMessage.startsWith('You:') ? '' : chat.userStatus ? `${chat.userStatus} ` : ''}
          {chat.lastMessage}
        </LastMessage>
      </ChatDetails>
      <TimeInfo>
        <TimeText>{chat.time}</TimeText>
        {chat.unreadCount > 0 && (
          <UnreadBadge>
            <UnreadText>{chat.unreadCount}</UnreadText>
          </UnreadBadge>
        )}
      </TimeInfo>
    </ItemContainer>
  );
};

export default ChatListItem;