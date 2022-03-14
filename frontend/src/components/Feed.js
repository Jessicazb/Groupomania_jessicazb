import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from '../components/Post/PostCard';
import PostFeed from '../components/Post/PostFeed';


function Feed() {
   /* 
    const [data, setData] = useState([])

    const Token = localStorage.getItem("Token")

    const userId = JSON.parse(localStorage.getItem("user")).id

    useEffect(() => {
        axios.get("http://localhost:4200/api/posts/", {
                headers: {
                    "x-access-token": Token,
                },
                params: { userId: userId },
            })
            .then(res => {
                setData(res.data)
            })
    }, [Token, setData, userId])
    const addnewpost = () => {
        window.location.reload()
    }

    ajout dans PostCard = <PostCard addPost={addnewpost}></PostCard>
    
 */
    return(
        <main className="main">
        <div className="feed">
        <div className='posts'>
        <PostCard /> 
        </div>
        <h1> Nouvelles publications:</h1>
        <ul className="getAll-Post">
        
      </ul>
        </div>
        </main>
    ); 
};
    

export default Feed;
