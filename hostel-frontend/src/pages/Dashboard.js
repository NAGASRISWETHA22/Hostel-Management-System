import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAvailableRooms();
    }, []);

    const fetchAvailableRooms = async () => {
        try {
            const response = await api.get('/rooms');
           
            const available = response.data.filter(room => !room.occupied);
            setRooms(available);
        } catch (err) {
            console.error("Error fetching rooms:", err);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#2c3e50', color: 'white', padding: '15px', borderRadius: '8px' }}>
                <h2>Student Portal</h2>
                <button onClick={handleLogout} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
            </div>

            <h3 style={{ marginTop: '30px' }}>Available Rooms</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
                {rooms.length > 0 ? (
                    rooms.map(room => (
                        <div key={room.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                            <h4 style={{ color: '#3498db' }}>Room No: {room.roomNumber}</h4>
                            <p>Type: <strong>{room.type}</strong></p>
                            <p>Monthly Rent: <span style={{ color: '#27ae60', fontWeight: 'bold' }}>₹{room.rentAmount}</span></p>
                            <button 
                                onClick={() => navigate('/student/payment', { state: { room } })}
                                style={{ width: '100%', padding: '10px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                            >
                                Book & Pay Now
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No rooms available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
