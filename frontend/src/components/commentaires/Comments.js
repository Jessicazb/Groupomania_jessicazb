import React from "react"
import axios from "axios"
import {useState, useEffect} from 'react';
import dayjs from "dayjs";
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';

//  DAYJS
require("dayjs/locale/fr")
const relativeTime = require("dayjs/plugin/relativeTime")
dayjs.extend(relativeTime)

function Comments (props){
  const {comments} = props
  const [DeleteIconTrash, setDeleteIconTrash] = useState(false)

  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  const userId = userInfo.id
  const userAdmin = userInfo.admin

  useEffect(() => {
    if (comments.userId === userId || userAdmin === 1) {
      setDeleteIconTrash(true)
    }
  }, [userId, comments.userId, userAdmin])

 
  const deleteHandle = () => {
    // axios Delete
    axios({
      method: "DELETE",
      url: "http://localhost:4200/api/comments",
      headers: {
        "Authorization": localStorage.getItem("Token"),
      },
      params: {users_id: userId},
      data: {
        userId,
        id: comments.id,
        admin: userAdmin,
      },
    })
      .then(res => {
        console.log(comments)
        props.commentToDelete(comments)
      })
      .catch(err => {
        console.log(err)
      })
  }
    
  const getAllComment =() => {
 // axios getAllComments
  }
return(
    <div className="card-comments">
    <div className="card-comments-header">
    <Avatar src ={comments.author.imageUrl}/>
    {comments.author.prenom} {comments.author.nom}
    </div>
    <div className="comments-text">
    <p className="comments-text-p">{comments.content}</p>
    </div>
    <span>
    { DeleteIconTrash && (
           <DeleteIcon className="delete-icon-comments"
           onClick={() => {
            if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                 deleteHandle()
            }
        }}/>
    )}
    </span>
    </div>
)
}

export default Comments;
