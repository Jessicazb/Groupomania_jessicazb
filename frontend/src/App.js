import './styles/settings.scss';
import React from "react";
import SigIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom"

//GuestRoute
const App = () =>{
  // système de routage client
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/sign-in" element={<SigIn />}/> 
      <Route path="/sign-Up" element={<SignUp />}/> 
      <Route path="*" element={<h1>Not found 404!</h1>}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
