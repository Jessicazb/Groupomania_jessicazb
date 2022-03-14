import React from "react"
import axios from "axios"
import {useState} from "react"
import SendIcon from '@material-ui/icons/Send';


function NewComments (props){
 const [commentMessage, setCommentMessage] = useState("");
 const user_id = JSON.parse(localStorage.getItem("user")).id

 return(
    <div>
    <form onSubmit={submitHandle(onSubmit)} className="comment-form">
    <input
          type="text"
          placeholder="Écrivez un commentaire..."
          onChange={e => setCommentMessage(e.target.value)}
          value={commentMessage}
          id="input-comment"
        />
     <SendIcon className="send-icon"/>
    </form>
     </div>
 )
}

export default NewComments;