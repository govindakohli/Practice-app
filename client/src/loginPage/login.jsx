import React, { useState } from 'react'
import { Link } from "react-router-dom";

function login() {
    const [email , setEmail] = useState()
    const [password , setPassword] = useState()
  return (
    <div>
      <div>
      <h2 >Login</h2>
      <form >
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
