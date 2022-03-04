import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MessageIcon from '@material-ui/icons/Message';
import { Typography } from '@material-ui/core';

function PostCard({ post }){
  return (
    <div className='card-1'>
    <div className='card-header'>
    <Avatar alt={post.author.name} src={post.author.avatar} />
    <span className='nom-author'>{post.author.name}</span>
    <span className='date'>{post.date}</span>
    </div>
    <div className='card-content'> 
      <p>{post.description}</p>
      <img src={post.image}/>
    </div>
    <div className='card-actions'>
    <IconButton aria-label="like">
        <FavoriteIcon/>
    <Typography
        style={{cursor: 'pointer'}}
        color= "textSecondary"
        variant = "body2">
            {'10'}
    </Typography>
    </IconButton>
    <IconButton>
    <MessageIcon/>
    <Typography
        style={{cursor: 'pointer'}}
        color= "textSecondary"
        variant = "body2">
            {'7'}
    </Typography>
    </IconButton>
    </div>
      </div>
    
  );
};

export default PostCard;