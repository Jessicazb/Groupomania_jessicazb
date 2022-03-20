import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';

function Header (){
    // authentification user/avatar
    const user = localStorage.getItem('user');
    console.log(user);
    if (user) {
        //return JSON.parse(user)
    } 
    return (
    <header className="header">
    <div className="toolbar">
   <div className="logo_home">
   <Link to = "/"><img src="../images/logo/icon-left-font.png" alt="Logo Goupomania"></img></Link>
        </div>
        <div className="flex-items-header">
        <Link to = "/Profil"><Avatar src={user.avatar} className='avatar'/></Link>
        </div>

    </div>
</header>
    );
};

export default Header;