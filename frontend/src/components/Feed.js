import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from '../components/Post/PostCard';
import PostFeed from '../components/Post/PostFeed';



function Feed() {
    // axios get all posts
    const [posts, setPosts] = useState([
        {
            userId: '1',
            content:'OI1',
            imageUrl:'https://avatars.githubusercontent.com/u/87673200?v=4',
            author: {
                prenom:'Jessica',
                nom:'Azevedo',
                imageUrl:'https://avatars.githubusercontent.com/u/87673200?v=4',
            },
            likes:'1',
            comments: [{
                id:'1',
                content:'ola!!',
                author: {
                    prenom:'Jessica',
                    nom:'Azevedo',
                    imageUrl:'https://avatars.githubusercontent.com/u/87673200?v=4',
                },
            }],
            usersLiked: ['Lucy'],
            createdAt:'15/03/2022',
        },
        {
            userId: '2',
            content:'Hello1',
            imageUrl:'https://avatars.githubusercontent.com/u/87673200?v=4',
            author: {
                prenom:'Jessica',
                nom:'Azevedo',
                imageUrl:'https://avatars.githubusercontent.com/u/87673200?v=4',
            },
            likes:'1',
            comments: [{
                id:'1',
                content:'ola!!',
                author: {
                    prenom:'Jessica',
                    nom:'Azevedo',
                    imageUrl:'https://avatars.githubusercontent.com/u/87673200?v=4',
                },  
            }],
            usersLiked: ['Lucy'],
            createdAt:'15/03/2022',
        }
    ]) 

    const Token = localStorage.getItem("Token")

    const userId = JSON.parse(localStorage.getItem("userInfo")).id
    console.log(Token)
    useEffect(() => {
        // récuperation de tous les posts
        axios.get("http://localhost:4200/api/posts", {
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
