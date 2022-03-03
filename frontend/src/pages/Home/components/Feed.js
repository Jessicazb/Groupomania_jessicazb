import React from 'react'; 
import PostCard from '../../../components/PostCard';

const posts = [
{
id:1,
author: {
name: 'Jéssica Azevedo',
username: 'Jessicazb',
avatar: '/images/avatar/avatar.jpg'
},
title: 'Mes vacances au Pérou',
date: 'March 3, 2022',
description: 'Le meilleur jus de mais du monde!',
image: '/images/Posts/Peru.jpeg'
},
{
id:2,
autor: {
name: 'Jéssica Azevedo',
username: 'Jessicazb',
avatar: ''
},
title: 'Mes vacances au Pérou',
date: 'March 3, 2022',
description: 'Le meilleur jus de mais du monde!',
image: ''
},
];
function Feed (){
   return(
    <main className="main">
    <div className="feed">
    {
        posts.map(post => (
            <PostCard key={post.id} post={post}/>
        ))
    }
    </div>
    </main>
   ); 
};

export default Feed;