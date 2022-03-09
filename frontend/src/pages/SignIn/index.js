import React from "react";
import './SigIn.scss';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useNavigate} from "react-router-dom"
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "../../utils/axios";


function SigIn() {
    // useState
    const [errorData, setErrorData] = useState("")

    // registrer + err
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    // usenavigate
    const navigate = useNavigate()

     const onSubmit = data => {
        // axios
        axios({
            method: "POST",
            url: `http://localhost:3000/api/auth/login`,
            data: {
                email: data.email,
                password: data.password,
            },
        })
            .then(res => {
                let token = res.data.token
                let user = JSON.stringify(res.data)
                console.log(token + user)
                localStorage.setItem("Token", token)
                localStorage.setItem("user", user)
                localStorage.getItem("user", user, "token", token)
                navigate("/Home")
            })
            .catch(err => {
                console.log(err)
                setErrorData("Vous n'êtes pas inscrit!")
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
                    <h4>Login</h4>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="connect-form">
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
                    <input type="submit" value="Connection" className="button" />
                    <span className="error-message">{errorData}</span>
                </form>
                <div className="pos-form">
                    <p className="creation-compte">Pas encore de compte?</p>
                </div>
            </div>
        </div>
    );
};

export default SigIn; 