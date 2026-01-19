import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminStudents.css';

const AdminStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users/students');
            setStudents(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching students:", error);
            setLoading(false);
        }
    };

    return (
        <div className="admin-students-container">
            <h2>Registered Students ({students.length})</h2>
            <div className="table-responsive">
                <table className="students-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.username}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phoneNumber || 'N/A'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No students found in database.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminStudents;
