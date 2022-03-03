import React from 'react';
import Avatar from '@material-ui/core/Avatar';

function PostCard({ post }){
  return (
    <div className='card-1'>
    <div className='card-header'>card header
    <Avatar alt="Jéssica Azevedo" src="./images/avatar/avatar.jpg" />
    </div>
    <div className='card-content'> card content
      <h1>{post.title}</h1>
      <p>{post.description}</p>
    </div>
    <div className='card-actions'>card actions</div>
      </div>
    
  );
};

export default PostCard;