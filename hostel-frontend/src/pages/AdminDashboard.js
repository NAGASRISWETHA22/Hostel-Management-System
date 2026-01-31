import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ total: 0, occupied: 0, available: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRoomStats = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get('/rooms');
            const rooms = response.data || [];
            
            // Calculate statistics
            const total = rooms.length;
            const occupied = rooms.filter(room => {
                const status = room.status?.toUpperCase();
                const isOccupied = room.isOccupied === 1 || room.isOccupied === true;
                return status === 'OCCUPIED' || status === 'OCCUPIED' || isOccupied;
            }).length;
            const available = total - occupied;

            setStats({ total, occupied, available });
            setLoading(false);
        } catch (err) {
            console.error("Error fetching room statistics:", err);
            setError("Failed to load room statistics");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoomStats();
        
        // Refresh stats every 30 seconds to keep data updated
        const interval = setInterval(fetchRoomStats, 30000);
        
        // Refresh when window regains focus (user returns to tab)
        const handleFocus = () => {
            fetchRoomStats();
        };
        window.addEventListener('focus', handleFocus);
        
        return () => {
            clearInterval(interval);
            window.removeEventListener('focus', handleFocus);
        };
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const handleRefresh = () => {
        fetchRoomStats();
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
                    <button className="nav-item" onClick={() => navigate('/admin/students')}>View Users</button>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="main-content">
                <header className="content-header">
                    <div>
                        <h1>Welcome back, Admin! 👋</h1>
                        <p>Overview of your hostel management system</p>
                    </div>
                    <button 
                        onClick={handleRefresh} 
                        className="refresh-btn"
                        title="Refresh Statistics"
                        disabled={loading}
                    >
                        <span className={loading ? 'spinning' : ''}>🔄</span>
                        {loading ? 'Loading...' : 'Refresh'}
                    </button>
                </header>

                {error && (
                    <div className="error-message">
                        <span>⚠️</span> {error}
                        <button onClick={fetchRoomStats} className="retry-btn">Retry</button>
                    </div>
                )}

                <section className="stats-grid">
                    <div className="stat-card total">
                        <div className="stat-icon">🏨</div>
                        <div className="stat-info">
                            <h3>Total Rooms</h3>
                            {loading ? (
                                <div className="stat-loading">...</div>
                            ) : (
                                <p className="stat-number">{stats.total}</p>
                            )}
                        </div>
                    </div>

                    <div className="stat-card occupied">
                        <div className="stat-icon">👤</div>
                        <div className="stat-info">
                            <h3>Occupied</h3>
                            {loading ? (
                                <div className="stat-loading">...</div>
                            ) : (
                                <p className="stat-number">{stats.occupied}</p>
                            )}
                        </div>
                    </div>

                    <div className="stat-card available">
                        <div className="stat-icon">✅</div>
                        <div className="stat-info">
                            <h3>Available</h3>
                            {loading ? (
                                <div className="stat-loading">...</div>
                            ) : (
                                <p className="stat-number">{stats.available}</p>
                            )}
                        </div>
                    </div>
                </section>

                <section className="quick-actions">
                    <h2>Quick Actions</h2>
                    <div className="action-buttons">
                        <button onClick={() => navigate('/admin/rooms')} className="btn-primary">Add New Room</button>
                        <button onClick={() => navigate('/admin/students')} className="btn-secondary">Check User Records</button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;