import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import FloatingShapes from '../components/FloatingShapes';

const Login = () => {
    const [roleChoice, setRoleChoice] = useState(null); 
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '', email: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignup) {
                // User Signup logic
                await api.post('/auth/signup', formData);
                alert("Signup Success! Please Login.");
                setIsSignup(false);
            } else {
                // Clear old data before fresh login
                localStorage.clear(); 

                const res = await api.post('/auth/login', formData);

                console.log("Login Response Data:", res.data);
                const token = res.data.token || res.data.accessToken;
                const userRole = res.data.role;

                if (token) {
                  
                    localStorage.setItem('token', token);
                    localStorage.setItem('role', userRole);

                    console.log("Storage Success: Token & Role Saved.");

                   
                    if (userRole && userRole.includes('ADMIN')) {
                        navigate('/admin/dashboard');
                    } else if (userRole && userRole.includes('STUDENT')) {
                        navigate('/user/dashboard');
                    } else {
                        alert("Role check failed: " + userRole);
                    }
                } else {
                    alert("Login failed: Token not received from server.");
                }
            }
        } catch (err) {
            console.error("Auth Error:", err);
            // Enhanced error message display
            const errorMessage = err.response?.data?.message || "Invalid Username or Password!";
            alert("Error: " + errorMessage);
        }
    };

    return (
        <div className="auth-wrapper animated-bg">
            <FloatingShapes />
            <h1 className="main-header">Hostel Management System</h1>

            <div className="login-container">
                <div className="login-card">
                    {roleChoice === null ? (
                        <div className="portal-selection">
                            <h2>Select Your Portal</h2>
                            <button className="login-btn portal-btn" onClick={() => setRoleChoice('admin')}>Admin Portal</button>
                            <button className="login-btn portal-btn user-portal" onClick={() => setRoleChoice('user')}>User Portal</button>
                        </div>
                    ) : (
                        <div>
                            <h2>{roleChoice === 'admin' ? 'Admin Login' : (isSignup ? 'User Signup' : 'User Login')}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <label>Username</label>
                                    <input type="text" placeholder="Enter Username" onChange={(e) => setFormData({...formData, username: e.target.value})} required />
                                </div>
                                {isSignup && (
                                    <div className="input-group">
                                        <label>Email</label>
                                        <input type="email" placeholder="Enter Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                                    </div>
                                )}
                                <div className="input-group">
                                    <label>Password</label>
                                    <input type="password" placeholder="Enter Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                                </div>
                                <button className="login-btn submit-btn" type="submit">{isSignup ? 'Register' : 'Login'}</button>
                            </form>
                            
                            {roleChoice === 'user' && (
                                <p onClick={() => setIsSignup(!isSignup)} className="signup-text">
                                    <span>{isSignup ? "Already have an account? Login" : "New User? Signup Here"}</span>
                                </p>
                            )}
                            <button onClick={() => {setRoleChoice(null); setIsSignup(false);}} className="back-link">← Back to Selection</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;