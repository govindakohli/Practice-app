import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function home() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const usersDate = async () => {
      await axios
        .get("http://localhost:8000/api/getall")
        .then((val) => {
          setUsers(val.data)
          // toast.success(val.data.msg , {position:"top-center"})
        })
        .catch((err) => console.log(err));
    };
    usersDate();
  }, []);
  const usersData = users;
  console.log(users.data);

  const deleteUser = async(z)=>{
await axios.delete(`http://localhost:8000/api/delete/${z}`)
.then((val)=>{
  // toast.success(val.data.msg , {position:"top-center"})
  location.reload();
})
  }
  return (
    <>
    <h1>All Users Details </h1>
      <button>
        <Link to="/addNew">Add New</Link>
      </button>
      <div className="App">
        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Action</th>
          </tr>

          {usersData.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <th>
                  <button>
                    <Link to={`/UpdateNew/`+user._id}>Edit</Link>
                  </button>
                  <button onClick={()=>{
                    deleteUser(user._id)
                  }} >Delete</button>
                  
                </th>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default home;
