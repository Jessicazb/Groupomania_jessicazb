import axios from "axios"
import React, { useState, useEffect } from "react"
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MessageIcon from '@material-ui/icons/Message';
import Avatar from '@material-ui/core/Avatar';
import NewComment from "../commentaires/NewComment";
import Comments from "../commentaires/Comments";
import dayjs from 'dayjs';
import api from '../../services/api'

// Gérer l'heure de posts avec DAYJS
require("dayjs/locale/fr")
const relativeTime = require("dayjs/plugin/relativeTime")
dayjs.extend(relativeTime)

function PostFeed({post}) {

    const [DeleteIconTrash, setDeleteIconTrash] = useState(false)
    const [dataComment, setDataComment] = useState([])
    const [showComments, setshowComments] = useState(false)
    

    // éxecuter le bloc de commentaires avec useEffect

    const addComment = newComment => {
        setDataComment(dataComment.concat(newComment))
    }
    const deleteComment = commentDelete => {
        let updateComment = dataComment.filter(i => i.id !== commentDelete.id)
        setDataComment(updateComment)
    }

    // récuperatio  des données dans le local storage
    const user = JSON.parse(localStorage.getItem("user"))
    const userId = user.id
    const userAdmin = user.admin

   async function loadComments(){
   /* try{
        const {data} = await api.get(`/comments?id=${post.id}`)
       setDataComment(data)
       setshowComments(data.length > 0)
       console.log("data 2")
       console.log(data) 
    }catch(error){
        console.log('erro comments')
    } */
   }
    // userId ou userAdmin peuvent deleter le post
    useEffect(() => {
        loadComments();
        if (post.users_id === userId || userAdmin) {
            setDeleteIconTrash(true)
        }
    }, [userId, post.users_id, userAdmin])

    // Delete Post
    const deleteHandle = () => {
    
        axios({
            method: "DELETE",
            url: "http://localhost:4200/api/posts",
            headers: {
                "Authorization": localStorage.getItem("Token"),
            },
            data: {
                id: post.id,
                users_id: userId,
                admin: userAdmin,
                posts_id: post.users_id,
            },
        })
            .then(res => {
                console.log(res)
                post.addPost(res.data)
            })
            .catch(err => {
                console.log(err)
            })
 
    }

    // like Post
    const likeHandle = () => {

    }


    return (

        <div>
            <div className="card-feed">
                <div>
                    {post.author} 
                </div>
                <div className="post-feed">
                    {console.log(post)}<p className="text-post">{post.text_content}</p>
                    {post.imageUrl && (
                        <img
                            src={post.imageUrl} 
                            alt="post-image"
                            className="post-image-feed"
                        />
                    )}
                </div>
                
                <div className="all-comments">
                    {showComments && dataComment.map((allComments, i) => (
                        <Comments className="comments"
                            allComments={allComments}
                            key={i}
                            commentDelete={deleteComment} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PostFeed;