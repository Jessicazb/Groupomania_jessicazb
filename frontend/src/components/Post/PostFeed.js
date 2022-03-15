import axios from "axios"
import React, { useState, useEffect } from "react"
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MessageIcon from '@material-ui/icons/Message';
import Avatar from '@material-ui/core/Avatar';
import NewComment from "../commentaires/NewComment";
import Comments from "../commentaires/Comments";

// Gérer l'heure de posts avec DAYJS
import dayjs from 'dayjs';
require("dayjs/locale/fr")
//const relativeTime = require ("dayjs/plugin/relaiveTime");

function PostFeed(props) {
    const { post } = props
    const [DeleteIconTrash, setDeleteIconTrash] = useState(false)
    const [dataComment, setDataComment] = useState([])
    const [showComments, setshowComments] = useState(false)

    // éxecuter le bloc de commentaires avec useEffect
    const allComments = post.allComments
      useEffect(() => {
      setDataComment(allComments)
    }, [allComments])

   

    const addComment = newComment => {
        setDataComment(dataComment.concat(newComment))
    }
    const deleteComment = commentToDelete => {
        let updateComment = dataComment.filter(i => i.id !== commentToDelete.id)
        setDataComment(updateComment)
    }
    
    // récuperatio  des données dans le local storage
    const user = JSON.parse(localStorage.getItem("user"))
    const users_id = user.id
    const users_admin = user.admin

    // Delete Post
    const deleteHandle = () => {

    }

    // like Post
    const likeHandle =() =>{

    }
  
    return (
        <div>
            <li className="card-feed">
                <div><Avatar className='avatar-feed' src={post.user.imageUrl} />
                    {post.users.prenom} {post.users.nom} {dayjs(post.createdAt).locale("fr").fromNow()}
                </div>
                <div className="post-feed">
                    <p className="text-post">{post.text_content}</p>
                    {post.imageUrl && (
                        <img
                            src={post.imageUrl}
                            alt="post-image"
                            className="post-image-feed"
                        />
                    )}
                </div>
                <div className="footer-post-feed">
                    <FavoriteIcon className="favorite-icon" onClick={likeHandle} />
                    <MessageIcon className="message-icon" />
                    <span>
                        {DeleteIconTrash && (
                            <DeleteIcon className="delete-icon"
                                onClick={() => {
                                    if (window.confirm("Voulez-vous supprimer ce post ?")) {
                                         deleteHandle()
                                    }
                                }} />
                        )}
                    </span>
                </div>
                <div className="ajout-new-comment">
                    <NewComment postId={post.id} newComment={addComment} />
                </div>
            <div className="all-comments">
            { showComments && dataComment.map((allComments, i) => (
               <Comments className="comments"
               allComments={allComments}
               key={i}/>
            ))}
            </div>
            </li>
        </div>
    )
}

export default PostFeed;