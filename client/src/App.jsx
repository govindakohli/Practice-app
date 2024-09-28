import "./App.css";
import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewUser from "./components/newUser";
import UpdateUser from "./components/updateUser";
import Home from "./components/home"
import Login from "./loginPage/login"
import Signup from "./loginPage/signup"
function App() {
  return (
    <>
      
      <BrowserRouter>
        <Routes>
        {/* <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/> */}
         <Route path="/" element={<Home/>}/>
         <Route path="/addNew" element={<NewUser/>}/>
         <Route path="/UpdateNew/:id" element={<UpdateUser/>}/>
       </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
