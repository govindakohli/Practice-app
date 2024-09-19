import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function signup() {
    const [email , setEmail] = useState()
    const [password , setPassword] = useState()
  return (
    <div>
      <h2 >signup</h2>
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
        <button type="submit" >signup</button>
       <p>Already have account <Link to="/">login</Link> </p> 
       
      </form>
    </div>
  )
}

export default signup
