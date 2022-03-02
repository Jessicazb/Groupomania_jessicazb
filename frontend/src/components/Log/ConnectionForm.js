import React, { useState } from "react";
import axios from "axios";

//input connection 
const ConnectionForm = () =>{
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');

  const eventLogin = (event) =>{

  }
  return (
    <form action="" onSubmit={eventLogin} id="connection-form">
      <label htmlFor="email">Email</label>
      <br />
      <input type="text" name="email" id="email" onChange={(event) => setEmail (event.target.value)} value={email}></input>
      <input type="submit" value="Se connecter"></input>
    </form>
    
  );
};

export default ConnectionForm;