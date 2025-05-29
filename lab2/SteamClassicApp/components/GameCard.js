
import React from 'react';
import { View, TouchableOpacity } from 'react-native'; 
import styled from 'styled-components/native';


const CardContainer = styled(TouchableOpacity)`
  background-color: ${props => props.theme.cardBackground};
  border-radius: 8px;
  margin-bottom: 15px;
  elevation: 3; /* Для тіні на Android */
  shadow-color: #000; /* Для тіні на iOS */
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  overflow: hidden; /* Щоб зображення не вилазило за межі borderRadius */
`;

const GameImage = styled.Image`
  width: 100%;
  height: 180px; /* Або інша висота згідно з дизайном */
`;

const InfoContainer = styled.View`
  padding: 10px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.text};
  margin-bottom: 5px;
`;

const PriceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;

const Price = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.primary}; /* Або інший колір для ціни */
  font-weight: bold;
`;

const OldPrice = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.tabBarInactive}; /* Сірий для старої ціни */
  text-decoration: line-through;
  margin-left: 10px;
`;

const PlatformText = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.tabBarInactive};
  margin-top: 3px;
`;


const GameCard = ({ game, onPress }) => {
  return (
    <CardContainer onPress={onPress}>
      <GameImage source={{ uri: game.imageUrl }} />
      <InfoContainer>
        <Title>{game.title}</Title>
        <PlatformText>{game.platforms.join(', ')}</PlatformText>
        <PriceContainer>
          <Price>{game.currentPrice}</Price>
          {game.oldPrice && <OldPrice>{game.oldPrice}</OldPrice>}
        </PriceContainer>
      </InfoContainer>
    </CardContainer>
  );
};

export default GameCard;