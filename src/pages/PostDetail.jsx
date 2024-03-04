/* eslint-disable */
import React from 'react';
import { useLocation } from 'react-router-dom';

const PostDetail = () => {
    const location = useLocation();
    const post = location.state.item;
  
    return (
      <div>
        <p>{post.postTitle}</p>
        <p>{post.postContent}</p>
        <p>{post.postWriter}</p>
        <p>{post.postDate}</p>
        <p>{post.postViews} Views</p>
        <p>{post.postLike} Likes</p>
      </div>
    );
  };

export default PostDetail