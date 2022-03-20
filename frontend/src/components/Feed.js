import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from '../components/Post/PostCard';
import PostFeed from '../components/Post/PostFeed';



function Feed() {
    const [posts, setPosts] = useState([]) 

    const Token = localStorage.getItem("Token")

    const userId = JSON.parse(localStorage.getItem("user")).id
    console.log(Token)
    useEffect(() => {
        // récuperation de tous les posts
        axios.get("http://localhost:4200/api/posts/", {
                headers: {
                    "Authorization": Token,
                },
                params: { userId: userId },
            })
            .then(res => {
                setPosts(res.posts)
            })
    }, [Token, setPosts, userId])
    const addnewpost = () => {
        window.location.reload()
    }
    
 
    return(
        <main className="main">
            <div className="feed">
                <div className='posts'>
                <PostCard addPost={addnewpost}></PostCard>
                </div>
                <h1> Nouvelles publications:</h1>
                
                {posts.map(post =>( 
                    <ul className="getAll-Post"> 
                        <PostFeed post />
                    </ul>
                ))} 
                
            </div>
        </main>
    ); 
};
    

export default Feed;
