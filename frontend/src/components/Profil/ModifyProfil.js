import React from "react";
import axios from "axios"
import {useForm} from "react-hook-form"
import Avatar from '@material-ui/core/Avatar';


function ModifyProfil (){


const {
  register,
  handleSubmit,
  formState: {errors},
} = useForm()

return(
    <div className="container-profil">
        <form className="form">
            <div className="form-profil">
            <Avatar className='avatar'/>
            <label htmlFor="prenom" className="prenom-label">
            Prénom:
          </label>
          <br/>
          <input
            type="text"
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
          <br/>
          <label htmlFor="nom" className="nom-label">
            Nom:
          </label>
          <br/>
          <input
            type="text"
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
          <br/>
          <label htmlFor="email" className="email-label">
            Email:
          </label>
          <br />
          <input
            className="form-input"
           
            type="email"
            {...register("email", {
              message: "Vous devez entrer une adresse mail valide",
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
          <br/>
          <input
            className="button-profil"
            type="submit"
            value="Modifier"
          />
            </div>
        </form>
    </div>
)

}
export default ModifyProfil;