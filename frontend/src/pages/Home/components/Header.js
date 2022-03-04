import React from 'react';
import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

function Header (){
    return (
    <header className="header">
    <div className="toolbar">
        <div className="logo_home">
        <img src="../images/logo/icon-left-font.png" alt="Logo Goupomania"></img>
        </div>
        <div className="flex-items-header">
        <Button variant="contained" color="secondary">Publier</Button>
        <Avatar src="/broken-image.jpg" className='avatar'/>
        </div>

    </div>
</header>
    );
};

export default Header;