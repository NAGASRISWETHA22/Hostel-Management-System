import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './AdminRooms.css';


const AdminRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [newRoom, setNewRoom] = useState({
        roomNumber: '',
        type: 'AC',
        capacity: 4,
        rentAmount: 5000
    });

    // Step 1: Backend-la irunthu existing rooms-ah fetch pannuvom
    const fetchRooms = async () => {
        try {
            const response = await api.get('/rooms');
            setRooms(response.data);
        } catch (error) {
            console.error("Error fetching rooms", error);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    // Step 2: Puthu room-ah Backend-ku anuppuvom
    const handleAddRoom = async (e) => {
    e.preventDefault();
    console.log("Sending Room Data:", newRoom); // Itha check panna
    try {
        const response = await api.post('/rooms', newRoom);
        console.log("Backend Response:", response.data);
        alert("Room added successfully!");
        setNewRoom({ roomNumber: '', type: 'AC', capacity: 4, rentAmount: 5000 });
        fetchRooms(); 
    } catch (error) {
        console.error("Full Error Object:", error); // Ithu thaan exact error-ah kaattum
        alert("Error adding room! Check console (F12) for details.");
    }
};

    return (
        <div className="rooms-container">
            <h2>Room Management</h2>
            
            {/* Form to add new room */}
            <form className="add-room-form" onSubmit={handleAddRoom}>
                <input 
                    placeholder="Room Number" 
                    value={newRoom.roomNumber}
                    onChange={(e) => setNewRoom({...newRoom, roomNumber: e.target.value})}
                    required 
                />
                <select onChange={(e) => setNewRoom({...newRoom, type: e.target.value})}>
                    <option value="AC">AC</option>
                    <option value="NON_AC">Non-AC</option>
                </select>
                <input 
                    type="number" 
                    placeholder="Rent" 
                    value={newRoom.rentAmount}
                    onChange={(e) => setNewRoom({...newRoom, rentAmount: e.target.value})}
                />
                <button type="submit">Add Room</button>
            </form>

            {/* List of rooms from Database */}
            <div className="rooms-list">
                <h3>Available Rooms</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Room No</th>
                            <th>Type</th>
                            <th>Rent</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map(room => (
                            <tr key={room.id}>
                                <td>{room.roomNumber}</td>
                                <td>{room.type}</td>
                                <td>₹{room.rentAmount}</td>
                                <td>{room.occupied ? "Full" : "Available"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminRooms;