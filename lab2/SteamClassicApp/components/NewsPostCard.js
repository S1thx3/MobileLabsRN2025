
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const CardContainer = styled(TouchableOpacity)`
  background-color: ${props => props.theme.cardBackground};
  border-radius: 8px;
  margin-bottom: 20px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.05;
  shadow-radius: 2px;
`;

const PostHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;

const AuthorInfo = styled.View`
  flex: 1;
`;

const AuthorName = styled.Text`
  color: ${props => props.theme.text};
  font-weight: bold;
  font-size: 16px;
`;

const PostDate = styled.Text`
  color: ${props => props.theme.tabBarInactive};
  font-size: 12px;
`;

const PostImage = styled.Image`
  width: 100%;
  height: 200px; /* Або інша висота */
`;

const PostContent = styled.View`
  padding: 10px;
`;

const PostTitle = styled.Text`
  color: ${props => props.theme.text};
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const PostExcerpt = styled.Text`
  color: ${props => props.theme.text};
  font-size: 14px;
  line-height: 20px; /* Міжрядковий інтервал */
`;

const PostStats = styled.View`
  flex-direction: row;
  padding: 10px;
  border-top-width: 1px;
  border-top-color: ${props => props.theme.background}; /* Лінія розділювач */
`;

const StatText = styled.Text`
  color: ${props => props.theme.tabBarInactive};
  font-size: 12px;
  margin-right: 15px;
  /* Тут можна додати іконки для лайків/коментарів */
`;

const NewsPostCard = ({ post, onPress }) => {
  return (
    <CardContainer onPress={onPress}>
      <PostHeader>
        <Avatar source={{ uri: post.authorAvatarUrl }} />
        <AuthorInfo>
          <AuthorName>{post.authorName}</AuthorName>
          <PostDate>{post.date}</PostDate>
        </AuthorInfo>
        {/* Тут можна додати іконку "три крапки" для меню посту */}
      </PostHeader>
      {post.imageUrl && <PostImage source={{ uri: post.imageUrl }} />}
      <PostContent>
        <PostTitle>{post.title}</PostTitle>
        <PostExcerpt>{post.excerpt}</PostExcerpt>
      </PostContent>
      <PostStats>
        <StatText>👍 {post.likes} Likes</StatText>
        <StatText>💬 {post.comments} Comments</StatText>
      </PostStats>
    </CardContainer>
  );
};

export default NewsPostCard;