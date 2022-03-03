import React from "react";
import Header from "./components/Header";
import Feed from "./components/Feed";
import './Home.scss';


function Home() {
    return (
        <div>
        <Header />
            <div className="toolbar">
            </div>
            <main className="main">
        <Feed />
            </main>
        </div>
    );
};

export default Home; 