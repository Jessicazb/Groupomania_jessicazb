import React from "react"
import axios from "axios"
import {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';

function Comments (props){
  const {comments} = props
  const [DeleteIconTrash, setDeleteIconTrash] = useState(false)
 
  const deleteHandle = () => {
    // axios Delete
  }
    
return(
    <div className="card-comments">
    <div className="card-comments-header">
    <Avatar src ={comments.user.imageUrl}/>
    {comments.users.prenom} {comments.users.nom}
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
