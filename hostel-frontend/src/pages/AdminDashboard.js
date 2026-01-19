import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ total: 10, occupied: 4 });

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="admin-container">
            {/* Sidebar Navigation */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>Hostel Admin</h2>
                </div>
                <nav className="nav-menu">
                    <button className="nav-item active" onClick={() => navigate('/admin/dashboard')}>Dashboard</button>
                    <button className="nav-item" onClick={() => navigate('/admin/rooms')}>Manage Rooms</button>
                    <button className="nav-item" onClick={() => navigate('/admin/students')}>View Students</button>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="main-content">
                <header className="content-header">
                    <h1>Welcome back, Admin! 👋</h1>
                    <p>Overview of your hostel management system</p>
                </header>

                <section className="stats-grid">
                    <div className="stat-card total">
                        <div className="stat-icon">🏨</div>
                        <div className="stat-info">
                            <h3>Total Rooms</h3>
                            <p className="stat-number">{stats.total}</p>
                        </div>
                    </div>

                    <div className="stat-card occupied">
                        <div className="stat-icon">👤</div>
                        <div className="stat-info">
                            <h3>Occupied</h3>
                            <p className="stat-number">{stats.occupied}</p>
                        </div>
                    </div>

                    <div className="stat-card available">
                        <div className="stat-icon">✅</div>
                        <div className="stat-info">
                            <h3>Available</h3>
                            <p className="stat-number">{stats.total - stats.occupied}</p>
                        </div>
                    </div>
                </section>

                <section className="quick-actions">
                    <h2>Quick Actions</h2>
                    <div className="action-buttons">
                        <button onClick={() => navigate('/admin/rooms')} className="btn-primary">Add New Room</button>
                        <button onClick={() => navigate('/admin/students')} className="btn-secondary">Check Student Records</button>
                        
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;