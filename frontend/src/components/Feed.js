import React from 'react';
import { useState, useEffect } from "react";
import PostCard from '../components/Post/PostCard';
import PostFeed from '../components/Post/PostFeed';
import api from '../services/api';


function Feed() {
    const [posts, setPosts] = useState([])
    const [comments, setComments]= useState([])
    const Token = localStorage.getItem("Token")
    const user = localStorage.getItem('user')
    const userId = JSON.parse(user).id

    
    async function loadPosts(){
        try{
            const {data} = await api.get("/posts");
           setPosts(data)
           console.log("data 2")
           console.log(data) 
        }catch(error){
            console.log('erro')
        }
    }
    useEffect(() => {
        // récuperation de tous les posts
        loadPosts()
    }, [Token, setPosts, userId])
    const addnewpost = () => {
        window.location.reload()
    }

    return (
        <main className="main">
            <div className="feed">
                <div className='posts'>
                    <PostCard addPost={addnewpost}></PostCard>
                </div>
                <h1> Nouvelles publications:</h1>

                {posts.map(post => (
                    <div className="getAll-Post">
                        <PostFeed post={post} />
                    </div>
                ))}

            </div>
        </main>
    );
};


export default Feed;
