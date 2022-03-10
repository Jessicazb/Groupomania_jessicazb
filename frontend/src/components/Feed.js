import React from 'react';
import { useState, useEffect } from "react"
import axios from "axios"
import PostCard from '../components/Post/PostCard';

/*
function Feed() {
    const [data, setData] = useState([])

    const Token = localStorage.getItem("Token")

    const userId = JSON.parse(localStorage.getItem("user")).id

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/posts/", {
                headers: {
                    "x-access-token": Token,
                },
                params: { userId: userId },
            })
            .then(res => {
                setData(res.data)
            })
    }, [Token, setData, userId])
    const prenomUser = JSON.parse(localStorage.getItem("user")).prenom
    const posts = () => {
        window.location.reload()
    }
*/
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
        <div className='posts'>
        {
            posts.map(post => (
                <PostCard key={post.id} post={post}/>
            ))
        }
        </div>
        <h1> Nouvelles publications:</h1>
        <div className='getAll-Post'>
         hello
        </div>
        </div>
        </main>
       ); 
    };
    

export default Feed;
