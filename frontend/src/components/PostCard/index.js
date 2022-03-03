import React from 'react';
import Avatar from '@material-ui/core/Avatar';

function PostCard({ post }){
  return (
    <div className='card-1'>
    <div className='card-header'>card header
    <Avatar />
    </div>
    <div className='card-content'> card content
      <h1>{post.description}</h1>
    </div>
    <div className='card-actions'>card actions</div>
      </div>
    
  );
};

export default PostCard;