import React from 'react';
import axios from "axios"
import {useState} from "react"
import {useForm} from "react-hook-form"
import Avatar from '@material-ui/core/Avatar';


const PostCard = props => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm()

  const [postImage, setPostImage] = useState(null)
  const [file, setFile] = useState(false)
  const [emptyMessage, setEmptyMesssage] = useState(null)

  //  Récuépraiton des infos img
  const handleImage = e => {
    setPostImage(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  const onSubmit = async content => {
    // Text ou image pour poster
    if (content.text_content || file) {
      // Message erreur false
      setEmptyMesssage(false)
      const user_id = JSON.parse(localStorage.getItem("user")).id
      let data
      // si image, la requête est type formData
      if (file) {
        axios.defaults.headers.post["Content-Type"] = "multipart/form-data"
        data = new FormData()
        data.append("user_id", user_id)
        data.append("text_content", content.text_content)
        data.append("file", file)
      } else {
        axios.defaults.headers.post["Content-Type"] =
          "application/x-www-form-urlencoded"
        data = {user_id: user_id, text_content: content.text_content}
      }
      // POST
      await axios({
        method: "POST",
        url: "http://localhost:4200/api/posts",
        headers: {
          "x-access-token": localStorage.getItem("Token"),
        },
        params: {userId: user_id},
        data,
      })
        .then(res => {
          console.log(res.data.post)
          props.addPost(res.data.post)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      setEmptyMesssage(true)
    }
  }
  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)} className="post-form">
      <div className="haeder-post">
      <Avatar className='avatar'/>
        <br />
        <textarea
          row={2}
          type="textarea"
          className="text_content_input"
          {...register("text_content", {
            minLength: {
              value: 10,
              message:
                "Vous devez créer un post de 10 caractères au minimum !",
            },
            maxLength: {
              value: 500,
              message: "Vous êtes au maximum de caractères pour ce post !",
            },
          })}
        />
        {errors.text_content && <span className='error-msg'>{errors.text_content.message}</span>}
      </div>
      <div className="image-post">
        <input className='fichier-post'
          type="file"
          id="imageUrl"
          name="file"
          accept=".jpg, .jpeg, .png, .gif"
          onChange={e => handleImage(e)}
        />
        <input className="button-post" type="submit" value="Publier" />
      </div>

      <div className="message-post">
        <p>
          {emptyMessage && "Veuillez publiez un message et/ou une image !"}
        </p>
        <img src={postImage} alt="" />
      </div>
    </form>
  </div>
)
};


export default PostCard;