import React from "react"
import { useState, useEffect } from 'react';
import dayjs from "dayjs";
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import api from '../../services/api'

//  DAYJS
require("dayjs/locale/fr")
const relativeTime = require("dayjs/plugin/relativeTime")
dayjs.extend(relativeTime)

function Comments({ comments, commentDelete }) {

  const [DeleteIconTrash, setDeleteIconTrash] = useState(false)

  const userInfo = JSON.parse(localStorage.getItem("user"))
  const userId = userInfo.id
  const userAdmin = userInfo.admin

  useEffect(() => {
    if (comments.User.id === userId || userAdmin === 1) {
      setDeleteIconTrash(true)
    }
  }, [userId, userAdmin])

  // delete comment
  async function deleteComment(id) {
    try {
      const data = await api.delete(`/comments/${id}`);
      commentDelete(data);
    } catch (error) {
    }
  }
  return (
    <div className="card-comments">
      <div className="card-comments-header">
        <Avatar className="avatar-comments" src={comments.User.avatar} />
        <p className="author-comments">{comments.User.prenom} {comments.User.nom}</p>
      </div>
      <div className="comments-text">
        <p className="comments-text-p">{comments.content}</p>
      </div>
      <span>
        {DeleteIconTrash && (
          <DeleteIcon className="delete-icon-comments"
            onClick={() => {
              if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                deleteComment(comments.id)
              }
            }} />
        )}
      </span>
    </div>
  )
}

export default Comments;
