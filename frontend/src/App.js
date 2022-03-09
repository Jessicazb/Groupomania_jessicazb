import './styles/settings.scss';
import React from "react";
import SigIn from './pages/SignIn';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GuestRoute from './routes/GuestRoute';
//GuestRoute
const App = () =>{
  // système de routage client
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/sign-in" element={<SigIn />}/> 
      <Route path="*" element={<h1>Not found 404!</h1>}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
