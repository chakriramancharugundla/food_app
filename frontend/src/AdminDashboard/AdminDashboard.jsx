import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './AdminDashboard.css';
import AdminHome from '../AdminHome/AdminHome';
import AdminRestaurants from '../AdminRestaurants/AdminRestaurants';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <nav className="sidebar">
                <ul>
                    <li><Link to="/admin">Home</Link></li>
                    <li><Link to="/admin/orders">Orders</Link></li>
                    <li><Link to="/admin/restaurants">Restaurants</Link></li>
                    <li><Link to="/admin/logout">Logout</Link></li>
                </ul>
            </nav>
            <main className="content">
                <Routes>
                    <Route path="/" element={<AdminHome />} />
                    <Route path="restaurants" element={<AdminRestaurants />} />
                    {/* <Route path="orders" element={<OrderList />} />
                    
                    <Route path="logout" element={<Logout />} /> */}
                </Routes>
            </main>
        </div>
    );
};

export default AdminDashboard;
