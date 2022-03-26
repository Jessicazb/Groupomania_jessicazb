import axios from "axios"
import React, { useState, useEffect } from "react"
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Avatar from '@material-ui/core/Avatar';
import NewComment from "../commentaires/NewComment";
import Comments from "../commentaires/Comments";
import dayjs from 'dayjs';
import api from '../../services/api'

// Gérer l'heure de posts avec DAYJS
require("dayjs/locale/fr")
const relativeTime = require("dayjs/plugin/relativeTime")
dayjs.extend(relativeTime)

function PostFeed({ post, deletePost, posts_id, newLike }) {

    const [DeleteIconTrash, setDeleteIconTrash] = useState(false)
    const [dataComment, setDataComment] = useState([])
    const [showComments, setshowComments] = useState(false)
    const [showLikes, setshowLikes] = useState(false)

    // éxecuter le bloc de commentaires avec useEffect

    const addComment = newComment => {
        setDataComment(prevState => {
            console.log("executou comments")
            return [...prevState, newComment]
        })
    }
    const deleteComment = commentDelete => {
        let updateComment = dataComment.filter(i => i.id !== commentDelete.id)
        setDataComment(updateComment)
    }

    // récuperatio  des données dans le local storage
    const user = JSON.parse(localStorage.getItem("user"))
    const userId = user.id
    const userAdmin = user.admin
    const Token = localStorage.getItem("Token")

    async function loadComments() {
        try {
            const { data } = await api.get(`/comments?id=${post.id}`)
            setDataComment(data)
            setshowComments(data.length > 0)
            console.log("data 2")
            console.log(data)
        } catch (error) {
            console.log('erro comments')
        }
    }
    // userId ou userAdmin peuvent deleter le post
    useEffect(() => {
        loadComments();
        if (post.users_id === userId || userAdmin) {
            setDeleteIconTrash(true)
        }
    }, [userId, post.users_id, userAdmin, dataComment])



    // like Post
    const likeHandle = data => {
        api.post("/likes", {
            users_id: userId,
            posts_id: posts_id,
            like: true
        })
            .then(res => {
                console.log("data like", res.data)
                newLike(res.data.like)
            })
            .catch(err => {
                console.log(err)
            })
    }
       // get like
    async function loadLikes() {
        try {
            const { data } = await api.get(`/likes/posts/?id=${post.id}`)
            setshowLikes(data)
            console.log("data 3")
            console.log(data)
        } catch (error) {
            console.log('erro likes')
        }
    }
    useEffect(() => {
        loadLikes();
    }, [userId, post.users_id, showLikes])

    return (
        <div>
            <div className="card-feed">
                <div>
                    <h4 className="author-posts">{post.User.prenom} {post.User.nom}</h4>
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
                <div className="footer-post-feed">
                    <FavoriteIcon className="favorite-icon" onClick={likeHandle} />
                    <span className="all-likes"> </span>
                    <span>
                        {DeleteIconTrash && (
                            <DeleteIcon className="delete-icon"
                                onClick={() => {
                                    if (window.confirm("Voulez-vous supprimer ce post ?")) {
                                        deletePost()
                                    }
                                }} />
                        )}
                    </span>
                </div>
                <div className="ajout-new-comment">
                    <NewComment posts_id={post.id} newComment={addComment} />
                </div>
                <div className="all-comments">
                    {showComments && dataComment.map((comments, i) => (
                        <Comments className="comments"
                            comments={comments}
                            key={i}
                            commentDelete={deleteComment}
                            posts_id={post.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PostFeed;