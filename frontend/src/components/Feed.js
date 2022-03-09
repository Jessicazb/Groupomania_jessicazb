import React from 'react'; 
import PostCard from '../components/Post/PostCard';
import ModifyPosts from '../components/Post/ModifyPosts';

    
const posts = [
    {
    id:"",
    author: {
    name: '',
    username: '',
    avatar: ''
    },
    date: '',
    description: '',
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