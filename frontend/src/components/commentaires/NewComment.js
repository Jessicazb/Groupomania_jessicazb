import React from "react"
import axios from "axios"
import {useState} from "react"
import {useForm} from "react-hook-form"
import SendIcon from '@material-ui/icons/Send';


function NewComments (props){
 const [commentMessage, setCommentMessage] = useState("");
 const [sendButton, setSendButton]= useState(false);
 const userId = JSON.parse(localStorage.getItem("userInfo")).id
 const {submitHandle} = useForm()

 const onSubmit = data => {
    // axios POST
    axios({
      method: "POST",
      url: "http://localhost:4200/api/comments",
      headers: {
        "Authorization": localStorage.getItem("Token"),
      },
      data: {
        users_id: userId,
        post_id: props.post_id,
        content: data.content,
      },
    })
      .then(res => {
        console.log("data comment", res.data.comment)
        props.newComment(res.data.comment)
      })
      .catch(err => {
        console.log(err)
      })
 }


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
    { setSendButton &&(
     <SendIcon className="send-icon" onClick={onSubmit}/>
    )}
    </form>
     </div>
 )
}

export default NewComments;