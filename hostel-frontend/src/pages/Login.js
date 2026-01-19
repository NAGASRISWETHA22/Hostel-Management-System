import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../features/authSlice';
import api from '../services/api';
import './Login.css';

const Login = () => {
  const [credentials, setCredentialsState] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentialsState({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("!!! Login Button Clicked !!! Data:", credentials);

    try {
      // Step 1: Call Backend
      const response = await api.post('/auth/login', credentials);
      console.log("Backend Response:", response.data);

      const { token, user } = response.data;

      // Step 2: Save Data
      localStorage.setItem('token', token);
      const userRole = user.role?.name || user.role || "ROLE_STUDENT";
      localStorage.setItem('role', userRole);

      // Step 3: Update Redux
      dispatch(setCredentials({ user, token }));

      // Step 4: Navigate
      alert("Success! Welcome " + user.username);
      
      if (userRole === 'ROLE_ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }

    } catch (error) {
      console.error("Login Error Details:", error);
      if (!error.response) {
        alert("Server Down! Check if your Spring Boot is running on port 8080.");
      } else {
        alert("Login Failed: " + (error.response.data?.message || "Invalid Credentials"));
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Hostel Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input 
              type="text" 
              name="username" 
              value={credentials.username}
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              value={credentials.password}
              onChange={handleChange} 
              required 
            />
          </div>
          {/* If this button still 'does nothing', check your Login.css for pointer-events: none */}
          <button type="submit" className="login-btn" style={{ cursor: 'pointer', opacity: 1 }}>
            Login Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;