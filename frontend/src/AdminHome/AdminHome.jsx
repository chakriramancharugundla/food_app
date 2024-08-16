import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminHome.css';

const AdminHome = () => {
    const [stats, setStats] = useState({ totalOrders: 0, pendingOrders: 0, acceptedOrders: 0 });

    useEffect(() => {
        axios.get('/api/admin/order-stats')
            .then(response => {
                setStats(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the order stats!', error);
            });
    }, []);

    return (
        <div className="admin-home">
            <h2>Dashboard</h2>
            <div className="stats">
                <div className="stat-item">
                    <h3>Total Orders</h3>
                    <p>{stats.totalOrders}</p>
                </div>
                <div className="stat-item">
                    <h3>Pending Orders</h3>
                    <p>{stats.pendingOrders}</p>
                </div>
                <div className="stat-item">
                    <h3>Accepted Orders</h3>
                    <p>{stats.acceptedOrders}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
