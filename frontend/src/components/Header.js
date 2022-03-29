import React, {useState, useEffect}from 'react';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Header (){
    const [userLogout, setUserLogout] = useState({});
    const logout = () =>{
        window.location.reload();
    }
    useEffect(()=>{
        setUserLogout(JSON.parse(localStorage.getItem('user')));
    },[]);

    // authentification user/avatar
    const user = localStorage.getItem('user');
    if (user) {
        
    } 
    return (
    <header className="header">
    <div className="toolbar">
   <div className="logo_home">
   <Link to = "/home"><img src="../images/logo/icon-left-font.png" alt="Logo Goupomania"></img></Link>
        </div>
        <div className="flex-items-header">
        <Link to = "/Profil"><Avatar src={user.avatar} className='avatar'/></Link>
        <span className='logout'>se déconnecter</span>
        <Link to ="/sign-in"><ExitToAppIcon className='icon-logout'/></Link>
        </div>

    </div>
</header>
    );
};

export default Header;