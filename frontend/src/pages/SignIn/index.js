import React from "react";
import './SigIn.scss';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios"
import { useState } from "react"


function SigIn() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState();
    
    const handleSignIn = (e) => {
        e.preventDefault();
    // appel à l'API
        axios
            .post("http://localhost:3000/api/auth/login", { email, password })
            .then((res) => {
                window.localStorage.setItem("token", res.data.token);
                window.localStorage.setItem("userId", res.data.userId);
                window.localStorage.setItem("is_admin", res.data.is_admin);
                window.location = "/Home";
            })
            .catch(err => {
                console.log("Vous n'êtes pas inscrit!")
            })
    };
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
                <form className="form">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={handleSignIn}
                    >
                        Connexion
                    </Button>
                </form>
                <div className="pos-form">
                    <a href=""><p className="creation-compte">Pas encore de compte?</p></a>
                </div>
            </div>
        </div>
    );
};

export default SigIn; 