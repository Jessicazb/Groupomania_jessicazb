import React, { useState, useEffect } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import Avatar from '@material-ui/core/Avatar';
import DeleteProfil from "./DeleteProfil";
import api from "../../services/api"

function ModifyProfil() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // gérer l'image avatar
  const [avatarImage, setAvatarImage] = useState(null)
  const [file, setFile] = useState(false)
  const [infoUser, setInfoUser] = useState({
    prenom: "",
    nom: "",
    email: "",
    avatar: ""
  })

  const handleImage = e => {
    setAvatarImage(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  async function loadUser() {
    const userInfo = JSON.parse(localStorage.getItem("user"))
    const id = userInfo.id

    try {
      const { data } = await api.get(`auth/updateUser/${id}`)
      setInfoUser({
        prenom: data.prenom,
        nom: data.nom,
        email: data.email,
        avatar: data.avatar
      })
      let user = JSON.stringify(data)
      localStorage.setItem("user", user)
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    loadUser()
  }, [infoUser])

  const onSubmit = data => {
    console.log(data)
    const prenom = data.prenom
    const nom = data.nom
    const email = data.email
    const avatar = data.avatar
    const userInfo = JSON.parse(localStorage.getItem("user"))
    const id = userInfo.id

    // upload imagem avatar
    if (file) {
      axios.defaults.headers.users = "multipart/form-data"
      data = new FormData()
      data.append("users_id", id)
      data.append("avatar", file)
    } else {
      axios.defaults.headers.users =
        "application/x-www-form-urlencoded"
      data = { users_id: data.id, avatar: data.avatar }
    }


    //axios PUT
    axios({
      method: "PUT",
      url: `http://localhost:4200/api/auth/updateUser?user=${id}`,
      headers: {
        "Authorization": localStorage.getItem("Token"),
      },
      params: { users_id: id },
      data: {
        id,
        prenom,
        nom,
        email,
        avatar,
      },
    })
      .then(res => {
        const userInfo = JSON.stringify(res.data)
        localStorage.setItem("user", userInfo)
        (window.confirm("Vos modifications ont bien été prise en compte!"))
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div onSubmit={handleSubmit(onSubmit)} className="container-profil">
      <form className="form">
        <div className="form-profil">
        <Avatar className='avatar' src={avatarImage} alt="" />
          <input className='fichier-profil'
            type="file"
            id="avatar"
            name="file"
            accept=".jpg, .jpeg, .png, .gif"
            onChange={e => handleImage(e)}
          />
          <label htmlFor="prenom" className="prenom-label">
            Prénom:
          </label>
          <br />
          <input
            type="text"
            defaultValue={infoUser.prenom}
            name="prenom"
            className="form-input"
            {...register("prenom", {
              minLength: {
                value: 2,
                message: "Il faut que votre prénon ait au moins 2 lettres!",
              },
              maxLength: {
                value: 30,
                message: "Ce prénom semble trop long...",
              },
            })}
          />
          {errors.prenom && <span>{errors.prenom.message}</span>}
          <br />
          <label htmlFor="nom" className="nom-label">
            Nom:
          </label>
          <br />
          <input
            type="text"
            defaultValue={infoUser.nom}
            className="form-input"
            {...register("nom", {
              minLength: {
                value: 2,
                message: "Il faut que votre nom ait au moins 2 lettres!",
              },
              maxLength: {
                value: 30,
                message: "Ce nom semble trop long...",
              },
            })}
          />
          {errors.nom && <span>{errors.nom.message}</span>}
          <br />
          <label htmlFor="email" className="email-label">
            Email:
          </label>
          <br />
          <input
            className="form-input"
            defaultValue={infoUser.email}
            type="email"
            {...register("email", {
              message: "Vous devez entrer une adresse mail valide",
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
          <br />
          <input
            className="button-profil"
            type="submit"
            value="Modifier"
          />
          <DeleteProfil />
        </div>
      </form>
    </div>
  )
}
export default ModifyProfil;