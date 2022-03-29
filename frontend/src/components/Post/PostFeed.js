import React, { useState, useEffect } from "react"
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Avatar from '@material-ui/core/Avatar';
import MessageIcon from '@material-ui/icons/Message';
import NewComment from "../commentaires/NewComment";
import Comments from "../commentaires/Comments";
import dayjs from 'dayjs';
import api from '../../services/api'

// Gérer l'heure de posts avec DAYJS
require("dayjs/locale/fr")
const relativeTime = require("dayjs/plugin/relativeTime")
dayjs.extend(relativeTime)

function PostFeed({ post, deletePost}) {

    const [DeleteIconTrash, setDeleteIconTrash] = useState(false)
    const [dataComment, setDataComment] = useState([])
    const [showComments, setshowComments] = useState(false)
    const [showLikes, setShowLikes] = useState(false)

    // éxecuter le bloc de commentaires avec useEffect

    const addComment = newComment => {
        setDataComment(prevState => {
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

    async function loadComments() {
        try {
            const { data } = await api.get(`/comments?id=${post.id}`)
            setDataComment(data)
            setshowComments(data.length > 0)
        } catch (error) {
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
    const likeHandle = async data => {
        try {
            const response = await api.get(`/likes/${post.id}/like/${userId}`)
            await api.post("/likes", {
                users_id: userId,
                posts_id: post.id,
                like: !response.data
            })
            const countLikes = !response.data ? showLikes+1 : showLikes-1;
            setShowLikes(countLikes)
        } catch (error) {
            console.log(error.message)
        }
    }
    // get like
    async function loadLikes() {
        try {
            const { data } = await api.get(`/likes/posts/${post.id}`)
            setShowLikes(data.length)

        } catch (error) {
            console.log("error like")
        }
    }
    useEffect(() => {
        loadLikes();
    }, [userId, post.users_id, showLikes])

    return (
        <div>
            <div className="card-feed">
                <div className="flex-avatar"><Avatar className="avatar-user"/>
                    <h4 className="author-posts">{post.User.prenom} {post.User.nom}</h4>
                </div>
                <span className="time_post">{dayjs(post.createdAt).locale("fr").fromNow()}</span>
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
                    <span className="all-likes">{showLikes}</span>
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
            
                <div className="all-comments"><MessageIcon className="icon-message" />
                <span className="p-comments">Commentaires</span>
                    {showComments && dataComment.map((comments, i) => (
                        <Comments className="comments"
                            comments={comments}
                            key={i}
                            commentDelete={deleteComment}
                            posts_id={post.id}
                        />
                    ))}
                </div>
                <div className="ajout-new-comment">
                    <NewComment posts_id={post.id} newComment={addComment} />
                </div>
            </div>
        </div>
    )
}

export default PostFeed;