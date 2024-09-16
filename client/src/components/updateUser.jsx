import React, { useState , useEffect} from "react";
import { Link, useNavigate , useParams } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast";

function updateUser() {
  const [firstName , setFirstName] = useState()
  const [lastName , setLastName] = useState()
  const [email , setEmail] = useState()
  const [password , setPassword] = useState()
  const navigate = useNavigate()
  const[updateUser,setupdateUser]= useState()


  console.log(updateUser)
  
const NewUserData = {firstName , lastName , email , password}
  const{id}= useParams()
  useEffect(()=>{
    axios.get(`http://localhost:8000/api/getOne/${id}`)
    .then((value)=>{
      setFirstName(value.data.firstName)
      setLastName(value.data.lastName)
      setEmail(value.data.email)
      setPassword(value.data.password)
    })
    .catch((err)=>console.log(err))
  },[id])

  const submitHandler = async(e)=>{
  e.preventDefault()
  axios.put(`http://localhost:8000/api/update/${id}
`,NewUserData )
.then((res)=>{
  toast.success(res.data.msg , {position:"top-center"})
})
.catch((err)=>console.log(err))
  }
  return (
    <form onSubmit={submitHandler}>
      <Link to="/">back</Link>
      <br />
      <br />
      <input type="text"  onChange={(e)=>setFirstName(e.target.value)} name="" value={firstName} id="1" placeholder="Fist Name"  />
      <br />
      <br />
      <input type="text"onChange={(e)=>setLastName(e.target.value)} name="" id="2" value={lastName} placeholder=" Last Name" />
      <br />
      <br />
      <input type="email"onChange={(e)=>setEmail(e.target.value)} name="" id="3" value={email} placeholder="Email" />
      <br />
      <br />
      <input type="password"onChange={(e)=>setPassword(e.target.value)} name="4" value={password} id="" placeholder="Password" />
      <br />
      <br />
      <br />
      <button>Update User</button>
    </form>
  )
}

export default updateUser
