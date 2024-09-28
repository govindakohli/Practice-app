import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Context from "../main";
import axios from "axios";
import toast from "react-hot-toast";

function login() {
  const {isAuthenticated, setIsAuthenticated} = useContext(Context);
    const [email , setEmail] = useState()
    const [password , setPassword] = useState()

    const navigateTo = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          "http://localhost:8000/api/login",
          { email, password },
          {
            withCredentials: true, // This ensures cookies are sent and received
            headers: { "Content-Type": "application/json" },
          }
        );
        setIsAuthenticated(true);
        navigateTo("/allUsers");
        setEmail("");
        setPassword("");
      } catch (error) {
        console.log(error)
      }
    };
  return (
    <div>
      <div>
      <h2 >Login</h2>
      <form onSubmit={handleLogin} >
        <div >
          <label  htmlFor="email">Email</label>
          <input
            
            type="email"
            id="email"
          
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div >
          <label  htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" >Login</button>
       <p>Doesn't have account  <Link to="/signup">signup</Link> </p> 
       
      </form>
    </div>
    </div>
  )
}

export default login
