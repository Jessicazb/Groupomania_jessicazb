import React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import SendIcon from '@material-ui/icons/Send';
import api from "../../services/api";


function NewComments({ posts_id, newComment }) {
  const [commentMessage, setCommentMessage] = useState("");
  const [sendButton, setSendButton] = useState(false);
  const userId = JSON.parse(localStorage.getItem("user")).id
  const { submitHandle } = useForm()

  const onSubmit = data => {
    console.log(data)
      api.post("/comments", {
        users_id: userId,
        posts_id: posts_id,
        content: commentMessage,
      })
        .then(res => {
          console.log("data comment", res.data)
          newComment(res.data.comment)
        })
        .catch(err => {
          console.log(err)
        })
    }


  return (
    <div>
      <form onSubmit={(onSubmit)} className="comment-form">
        <input className="new-comments"
          type="text"
          placeholder="Écrivez un commentaire..."
          onChange={e => setCommentMessage(e.target.value)}
          value={commentMessage}
          id="input-comment"
        />
        {setSendButton && (
          <SendIcon className="send-icon" onClick={onSubmit} />
        )}
      </form>
    </div>
  )
}

export default NewComments;