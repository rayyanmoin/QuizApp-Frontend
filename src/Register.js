import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
      // Check if username and password are not empty
      if (!username || !password) {
        toast.warning('Please enter both username and password!', {
          position: 'top-right',
          autoClose: 3000, // 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return; // Don't proceed with the login if fields are empty
      }
    // Implement API call to the backend for authentication
    const response = await fetch('http://localhost:8080/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.token === 'User_Created_Successfully') {
      toast.success('Registration Successful!', {
        position: 'top-right',
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setUsername('');
      setPassword('');
    } else { 
      toast.error('User with this username already exist', {
        position: 'top-right',
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div className='modal-content'>
    <form>
      <h1>Register</h1>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Login</button>
    </form> 
    </div>
  );
};

export default Register;
