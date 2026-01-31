import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminStudents.css';

const AdminStudents = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            
            const response = await axios.get('http://localhost:8080/api/users/students', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user =>
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="admin-students-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading users...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-students-container">
            <div className="admin-header">
                <div>
                    <h2>Registered Users</h2>
                    <p className="header-subtitle">Manage and view all registered users</p>
                </div>
                <span className="user-count">{users.length} Users</span>
            </div>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="🔍 Search by username or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="table-wrapper">
                <table className="modern-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td className="id-cell">{user.id}</td>
                                    <td className="username-cell">
                                        <span className="username-icon">👤</span>
                                        {user.username}
                                    </td>
                                    <td className="email-cell">{user.email}</td>
                                    <td>{user.phoneNumber || user.phone_number || 'N/A'}</td>
                                    <td>
                                        <span className={`status-badge ${user.role?.includes('ADMIN') ? 'admin-badge' : 'user-badge'}`}>
                                            {user.role?.replace('ROLE_', '') || 'USER'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="no-data">
                                    <div className="no-data-content">
                                        <span className="no-data-icon">👥</span>
                                        <p>{searchTerm ? 'No users found matching your search.' : 'No users found in database.'}</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminStudents;