import axios from "axios"
import './SignUp.scss';
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useState } from "react"
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

function SignUp () {
    // useState
    const [errorData, setErrorData] = useState("")

    // register
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    // navigate
    const navigate = useNavigate()

    // axios
    const onSubmit = data => {
        axios({
            method: "POST",
            url: `http://localhost:4200/api/auth/signup`,
            data: {
                prenom: data.prenom,
                nom: data.nom,
                email: data.email,
                password: data.password,
            },
        })
            .then(res => {
                localStorage.clear();
                navigate("/sign-in")
                /*let token = res.data.token
                let userInfo = JSON.stringify(res.data)
                localStorage.clear();
                localStorage.setItem("Token", token)
                localStorage.setItem("userInfo", userInfo)*/
                  
            })
            .catch(error => {
                console.log(error)
                setErrorData(
                    "Vous êtes déjà inscrit à cette adresse mail, connectez-vous !"
                )
            })
    }

    return (
        <div className="container">
            <div className="container-img">
                <img src="./images/logo/icon.png" alt="Logo Goupomania"></img>
            </div>
            <div className="container-form">
                <div className="form-avatar">
                    <Avatar className="avatar">
                        <LockOutlinedIcon />
                    </Avatar>
                    <h3>Inscription</h3>
                </div>
            <form onSubmit={handleSubmit(onSubmit)} className="inscription-form">
                {/* prenom */}
                <label htmlFor="prenom">Prenom:</label>
                <br />
                <input
                    {...register("prenom", {
                        required: true,
                        minLength: {
                            value: 2,
                            message: "Vous devez entrer au moins 2 caractères",
                        },
                        maxLength: {
                            value: 10,
                            message: "Vous devez entrer au maximum 10 caractères",
                        },
                    })}
                />
                {errors.prenom && <span>{errors.prenom.message}</span>}
                <br />
                {/* nom */}
                <label htmlFor="nom">Nom:</label>
                <br />
                <input
                    type="text"
                    {...register("nom", {
                        required: true,
                        minLength: {
                            value: 2,
                            message: "Vous devez entrer au moins 2 caractères",
                        },
                        maxLength: {
                            value: 10,
                            message: "Vous devez entrer au maximum 10 caractères",
                        },
                    })}
                />
                {errors.nom && <span>{errors.nom.message}</span>}
                <br />
                {/* email */}
                <label htmlFor="email">Email:</label>
                <br />
                <input
                    type="email"
                    {...register("email", {
                        required: true,
                        message: "Vous devez entrer une adresse mail valide",
                    })}
                />
                {errors.email && <span>{errors.email.message}</span>}
                <br />
                {/* password */}
                <label htmlFor="password">Mot de passe:</label>
                <br />
                <input
                    type="password"
                    {...register("password", {
                        required: true,
                        pattern: {
                            value: /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,64})$/,
                            message:
                                "Votre mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
                        },
                    })}
                />
                {errors.password && <span>{errors.password.message}</span>}
                <br />
                <input type="submit" value="Inscription" className="button" />
                <span className="error-message">{errorData}</span>{" "}
            </form>
        </div>
    </div>
    )
}

export default SignUp;