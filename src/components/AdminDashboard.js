import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) {
            const password = window.prompt('Enter Admin Password:');
            if (password === 'admin123') {
                localStorage.setItem('isAdmin', 'true');
            } else {
                alert('Unauthorized access');
                navigate('/');
            }
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        alert('Logged out successfully');
        navigate('/');
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin tools. Select an option below:</p>
            <ul>
                <li>
                    <button onClick={() => navigate('/admin/manage-rides')} className="btn btn-primary">
                        Manage Rides
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate('/admin/manage-drivers')} className="btn btn-secondary">
                        Manage Drivers
                    </button>
                </li>
            </ul>
            <button onClick={handleLogout} className="btn btn-danger">
                Logout
            </button>
        </div>
    );
};

export default AdminDashboard;
