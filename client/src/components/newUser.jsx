import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast";

function newUser() {
  const [firstName , setFirstName] = useState()
  const [lastName , setLastName] = useState()
  const [email , setEmail] = useState()
  const [password , setPassword] = useState()
  const navigate = useNavigate()
  
const NewUserData = {firstName , lastName , email , password}

  const submitHadler = async(e)=>{
    e.preventDefault()
   await axios.post("http://localhost:8000/api/create" , NewUserData )
   .then((value)=>{
    toast.success(value.data.msg , {position:"top-center"})})
    navigate("/")
  // .then((val)=>console.log(val.data.msg))
   .catch((err)=>console.log(err))
   location.reload();
  }
  return (
    <form onSubmit={submitHadler} >
      <Link to="/">back</Link>
      <br />
      <br />
      <input type="text" onChange={(e)=>setFirstName(e.target.value)} name="" id="1" placeholder="Fist Name" />
      <br />
      <br />
      <input type="text"onChange={(e)=>setLastName(e.target.value)} name="" id="2" placeholder=" Last Name" />
      <br />
      <br />
      <input type="email"onChange={(e)=>setEmail(e.target.value)} name="" id="3" placeholder="Email" />
      <br />
      <br />
      <input type="password"onChange={(e)=>setPassword(e.target.value)} name="4" id="" placeholder="Password" />
      <br />
      <br />
      <br />
      <button>New User</button>
    </form>
  );
}

export default newUser;
