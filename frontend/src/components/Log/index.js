// Page profil login/inscription
import React, { useState } from "react"
import ConnectionForm from "./ConnectionForm";
import InscriptionForm from "./InscriptionForm";

const Log = () =>{
  const [connectionModal, setConnectionModal] = useState(true); //props
  const [inscriptionModal, setInscriptionModal] = useState(false);
  
// logique pour l'évenement
  const eventModals = (event) => {
    if(event.target.id === "register"){
    setInscriptionModal(false);
    setInscriptionModal(true);
    }else if(event.target.id === "login"){
    setConnectionModal(false);
    setConnectionModal(true);
    }
  }
  return (
    <div className="connection-form">
     <div className="form-card">
       <ul>
         <li onClick={eventModals} id="register" className={inscriptionModal? "active-color-btn" : null}> S'inscrire</li>
         <li onClick={eventModals} id="login" className={connectionModal? "active-color-btn" : null}> Se connecter</li>
       </ul>
       {connectionModal && < ConnectionForm />}
       {inscriptionModal && < InscriptionForm />}
     </div>
    </div>
  );
};

export default Log;
