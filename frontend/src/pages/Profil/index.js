import React from "react";
import Header from "../../components/Header";
import ModifyProfil from "../../components/Profil/ModifyProfil";
import './Profil.scss'

function Profil() {
    return (
        <div>
        <Header />
        <div className="toolbar"></div>   
        <ModifyProfil />
        </div>
    );
};

export default Profil; 