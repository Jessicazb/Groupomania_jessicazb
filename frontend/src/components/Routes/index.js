// gerer les routes avec react
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profil from '../../pages/Profil';
import Feed from '../../pages/Feed';
import Login from '../../pages/Login';


const index = () => {
    return (
        <div>
            <Router>
                <Route path="/" exact component={Profil} />
                <Route path="/Feed" exact component={Feed} />
                <Route path="/Login" exact component={Login} />
            </Router>
        </div>
    );
};

export default index;