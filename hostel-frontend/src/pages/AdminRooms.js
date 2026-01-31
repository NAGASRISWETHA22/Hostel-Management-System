import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './AdminRooms.css';

const AdminRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newRoom, setNewRoom] = useState({
        roomNumber: '',
        type: 'AC',
        capacity: 4,
        rentAmount: 5000
    });
    const [showForm, setShowForm] = useState(false);

    const fetchRooms = async () => {
        try {
            setLoading(true);
            const response = await api.get('/rooms');
            setRooms(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching rooms", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleAddRoom = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/rooms', newRoom);
            alert("Room added successfully!");
            setNewRoom({ roomNumber: '', type: 'AC', capacity: 4, rentAmount: 5000 });
            setShowForm(false);
            fetchRooms(); 
        } catch (error) {
            console.error("Full Error Object:", error); 
            alert("Error adding room! Check console (F12) for details.");
        }
    };

    const handleStatusUpdate = async (roomId, newStatus) => {
        try {
            await api.put(`/rooms/${roomId}/status?status=${newStatus}`);
            alert("Room status updated successfully!");
            fetchRooms();
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Error updating room status!");
        }
    };

    const getStatusClass = (status, isOccupied) => {
        if (status === 'Occupied' || status === 'OCCUPIED' || isOccupied) {
            return 'status-occupied';
        } else if (status === 'Maintenance' || status === 'MAINTENANCE') {
            return 'status-maintenance';
        }
        return 'status-available';
    };

    const getStatusText = (status, isOccupied) => {
        if (status === 'Occupied' || status === 'OCCUPIED' || isOccupied) {
            return 'Occupied';
        } else if (status === 'Maintenance' || status === 'MAINTENANCE') {
            return 'Maintenance';
        }
        return 'Available';
    };

    return (
        <div className="admin-rooms-container">
            <div className="rooms-header">
                <div>
                    <h2>Room Management</h2>
                    <p className="header-subtitle">Manage hostel rooms and their availability</p>
                </div>
                <button 
                    className="add-room-toggle-btn"
                    onClick={() => setShowForm(!showForm)}
                >
                    <span>{showForm ? '✕' : '+'}</span>
                    {showForm ? 'Cancel' : 'Add New Room'}
                </button>
            </div>

            {showForm && (
                <div className="add-room-card">
                    <h3 className="form-title">Add New Room</h3>
                    <form className="add-room-form" onSubmit={handleAddRoom}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Room Number *</label>
                                <input 
                                    type="text"
                                    placeholder="e.g., 101, 201A" 
                                    value={newRoom.roomNumber}
                                    onChange={(e) => setNewRoom({...newRoom, roomNumber: e.target.value})}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Type *</label>
                                <select 
                                    value={newRoom.type}
                                    onChange={(e) => setNewRoom({...newRoom, type: e.target.value})}
                                >
                                    <option value="AC">AC</option>
                                    <option value="NON_AC">Non-AC</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Capacity</label>
                                <input 
                                    type="number"
                                    min="1"
                                    max="10"
                                    placeholder="Number of beds"
                                    value={newRoom.capacity}
                                    onChange={(e) => setNewRoom({...newRoom, capacity: parseInt(e.target.value) || 4})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Monthly Rent (₹) *</label>
                                <input 
                                    type="number"
                                    min="0"
                                    step="100"
                                    placeholder="5000"
                                    value={newRoom.rentAmount}
                                    onChange={(e) => setNewRoom({...newRoom, rentAmount: parseFloat(e.target.value) || 5000})}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="submit-btn">
                            <span>➕</span> Add Room
                        </button>
                    </form>
                </div>
            )}

            <div className="rooms-list-card">
                <div className="rooms-list-header">
                    <h3>
                        <span className="icon">🏨</span>
                        All Rooms
                        <span className="room-count-badge">{rooms.length}</span>
                    </h3>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading rooms...</p>
                    </div>
                ) : (
                    <div className="table-container">
                        <table className="rooms-table">
                            <thead>
                                <tr>
                                    <th>Room No</th>
                                    <th>Type</th>
                                    <th>Capacity</th>
                                    <th>Rent (₹)</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms.length > 0 ? (
                                    rooms.map(room => (
                                        <tr key={room.id}>
                                            <td className="room-number-cell">
                                                <span className="room-icon">🚪</span>
                                                {room.roomNumber}
                                            </td>
                                            <td>
                                                <span className={`type-badge ${room.type === 'AC' ? 'ac-badge' : 'non-ac-badge'}`}>
                                                    {room.type}
                                                </span>
                                            </td>
                                            <td className="capacity-cell">
                                                <span className="capacity-icon">👥</span>
                                                {room.capacity || 'N/A'}
                                            </td>
                                            <td className="rent-cell">
                                                <strong>₹{room.rentAmount || '0'}</strong>
                                            </td>
                                            <td>
                                                <span className={`status-badge ${getStatusClass(room.status, room.isOccupied)}`}>
                                                    {getStatusText(room.status, room.isOccupied)}
                                                </span>
                                            </td>
                                            <td className="actions-cell">
                                                <select 
                                                    className="status-select"
                                                    value={room.status || (room.isOccupied ? 'Occupied' : 'Available')}
                                                    onChange={(e) => handleStatusUpdate(room.id, e.target.value)}
                                                >
                                                    <option value="Available">Available</option>
                                                    <option value="Occupied">Occupied</option>
                                                    <option value="Maintenance">Maintenance</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="no-data">
                                            <div className="no-data-content">
                                                <span className="no-data-icon">🏠</span>
                                                <p>No rooms found. Add your first room above!</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminRooms;