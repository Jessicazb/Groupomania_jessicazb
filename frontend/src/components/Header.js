import React from 'react';
import Avatar from '@material-ui/core/Avatar';

function Header (){
    // authentification user/avatar
    const user = localStorage.getItem('user');
    console.log(user);
    if (user) {
        return JSON.parse(user)
    } 
    return (
    <header className="header">
    <div className="toolbar">
        <div className="logo_home">
        <img src="../images/logo/icon-left-font.png" alt="Logo Goupomania"></img>
        </div>
        <div className="flex-items-header">
        <Avatar src={user && user.avatar} className='avatar'/>
        </div>

    </div>
</header>
    );
};

export default Header;