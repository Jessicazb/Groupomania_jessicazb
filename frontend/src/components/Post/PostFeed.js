import axios from "axios"
import React, { useState, useEffect } from "react"
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MessageIcon from '@material-ui/icons/Message';
import Avatar from '@material-ui/core/Avatar';
import NewComment from "../commentaires/NewComment";
import Comments from "../commentaires/Comments";
import dayjs from 'dayjs';

// Gérer l'heure de posts avec DAYJS
require("dayjs/locale/fr")
const relativeTime = require("dayjs/plugin/relativeTime")
dayjs.extend(relativeTime)

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
    const deleteComment = commentDelete => {
        let updateComment = dataComment.filter(i => i.id !== commentDelete.id)
        setDataComment(updateComment)
    }

    // récuperatio  des données dans le local storage
    const user = JSON.parse(localStorage.getItem("userInfo"))
    const userId = user.id
    const userAdmin = user.isAdmin

    // userId ou userAdmin peuvent deleter le post
    useEffect(() => {
        if (post.users_id === userId || userAdmin === 1) {
            setDeleteIconTrash(true)
        }
    }, [userId, post.users_id, userAdmin])

    // Delete Post
    const deleteHandle = () => {

        axios({
            method: "DELETE",
            url: "http://localhost:4200/api/posts",
            headers: {
                "x-access-token": localStorage.getItem("Token"),
            },
            data: {
                id: post.id,
                users_id: userId,
                admin: userAdmin,
                posts_id: post.users_id,
            },
        })
            .then(res => {
                props.addPost(res.data.post)
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
            <li className="card-feed">
                <div><Avatar className='avatar-feed' src={post.author.imageUrl} />
                    {post.author.prenom} {post.author.nom} {dayjs(post.createdAt).locale("fr").fromNow()}
                </div>
                <div className="post-feed">
                    <p className="text-post">{post.content}</p>
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
                    <MessageIcon className="message-icon" onClick={() => setshowComments(!showComments)} />
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
                    <NewComment posts_id={post.id} newComment={addComment} />
                </div>
                <div className="all-comments">
                    {showComments && post.comments.map((allComments, i) => (
                        <Comments className="comments"
                            allComments={allComments}
                            key={i}
                            commentDelete={deleteComment} />
                    ))}
                </div>
            </li>
        </div>
    )
}

export default PostFeed;