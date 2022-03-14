import axios from "axios"
import React, {useState, useEffect} from "react"
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MessageIcon from '@material-ui/icons/Message';
import Avatar from '@material-ui/core/Avatar';

// Gérer l'heure de posts avec DAYJS
import dayjs from 'dayjs';
require ("dayjs/locale/fr")
//const relativeTime = require ("dayjs/plugin/relaiveTime");

function PostFeed (props){
    const {post} = props


    return(
        <div>
        <li className="card-feed">
        <div><Avatar className='avatar-feed' src ={post.userId.imageUrl}/>
        {post.users.prenom} {post.users.nom} {dayjs(post.createdAt).locale("fr").fromNow()}
        </div>
        <div className="post-feed">
         <p className="text-post">{post.text_content}</p>
        {post.imageUrl && (
            <img 
            src={post.imageUrl}
            alt= "post-image"
            className="post-image-feed"
            />
        )}
        </div>
        <div className="footer-post-feed">
       <FavoriteIcon className="favorite-icon"/>
       <MessageIcon className="message-icon"/>
       {DeleteIcon && (
           <DeleteIcon className="delete-icon"/>
       )}
        </div>

        </li>
        </div>
    )
}

export default PostFeed;