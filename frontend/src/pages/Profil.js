import React from "react"
import Log from "../components/Log";

const Profil = () => {
  return (
    <div className="profil-page">
      <div className="log-card">
        <Log />
        <div className="img-login">
         <img src="./images/icon.png" alt="Logo Goupomania"></img>
        </div>

      </div>

    </div>
  );
};

export default Profil;