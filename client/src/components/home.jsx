import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../main";

function Home() {
  const [users, setUsers] = useState([]);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
        // Retrieve the token from localStorage (or sessionStorage)
        const token = localStorage.getItem('token');

        // Log token to see if it's being retrieved correctly
        console.log('Token:', token);

        // Check if the token is present
        if (!token) {
            console.log('No token found');
            return;
        }

        // Make the logout request with the token in the headers
        const response = await axios.get('http://localhost:8000/api/user/logout', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Logout successful', response.data);

        // Optionally, clear the token and redirect user after successful logout
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirect to login page

    } catch (error) {
        console.error('Logout error:', error.response ? error.response.data : error.message);
    }
};

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getall", {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete/${userId}`, {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      location.reload(); // Reload after deletion
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <>
      <h1>All Users Details</h1>
      <button>
        <Link to="/addNew">Add New</Link>
      </button>
      <button onClick={handleLogout}>Logout</button>
      <div className="App">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <button>
                    <Link to={`/UpdateNew/${user._id}`}>Edit</Link>
                  </button>
                  <button onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;
