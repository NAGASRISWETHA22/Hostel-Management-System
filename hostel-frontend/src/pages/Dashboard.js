import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAvailableRooms();
    }, []);

    const fetchAvailableRooms = async () => {
        try {
            const response = await api.get('/rooms');
            const available = response.data.filter(room => 
                room.status === 'Available' || 
                room.status === 'AVAILABLE' || 
                (!room.isOccupied || room.isOccupied === 0)
            );
            setRooms(available);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching rooms:", err);
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="user-dashboard">
            <header className="dashboard-header">
                <div className="header-content">
                    <div>
                        <h1 className="dashboard-title">User Portal</h1>
                        <p className="dashboard-subtitle">Browse and book available rooms</p>
                    </div>
                    <button onClick={handleLogout} className="logout-btn">
                        <span>🚪</span> Logout
                    </button>
                </div>
            </header>

            <main className="dashboard-main">
                <div className="rooms-section">
                    <h2 className="section-title">
                        <span className="icon">🏨</span> Available Rooms
                        <span className="room-count">({rooms.length})</span>
                    </h2>
                    
                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <p>Loading rooms...</p>
                        </div>
                    ) : rooms.length > 0 ? (
                        <div className="rooms-grid">
                            {rooms.map(room => (
                                <div key={room.id} className="room-card">
                                    <div className="room-header">
                                        <span className="room-number">Room {room.roomNumber}</span>
                                        <span className={`room-status ${room.status?.toLowerCase() || 'available'}`}>
                                            {room.status || 'Available'}
                                        </span>
                                    </div>
                                    <div className="room-details">
                                        <div className="detail-item">
                                            <span className="detail-label">Type</span>
                                            <span className="detail-value">{room.type || 'Standard'}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Capacity</span>
                                            <span className="detail-value">{room.capacity || 'N/A'}</span>
                                        </div>
                                        <div className="detail-item price">
                                            <span className="detail-label">Monthly Rent</span>
                                            <span className="detail-value price-amount">₹{room.rentAmount || '0'}</span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => navigate('/user/payment', { state: { room } })}
                                        className="book-btn"
                                    >
                                        <span>💳</span> Book & Pay Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-rooms">
                            <div className="no-rooms-icon">🏠</div>
                            <h3>No rooms available</h3>
                            <p>Please check back later for available rooms.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
