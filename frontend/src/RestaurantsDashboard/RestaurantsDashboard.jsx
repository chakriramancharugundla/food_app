import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './RestaurantsDashboard.css'
import RestaurantsHome from '../RestaurantsHome/RestaurantsHome';

const RestaurantsDashboard = () => {
    return (
        <div className="admin-dashboard">
            <nav className="sidebar">
                <ul>
                    <li><Link to="/restaurants">Home</Link></li>
                    <li><Link to="/restaurants/managemenu">Manage Menu</Link></li>
                    <li><Link to="/restaurants/manageorders">Manage Orders</Link></li>
                    <li><Link to="/restaurants/logout">Logout</Link></li>
                </ul>
            </nav>
            <main className="content">
                <Routes>
                <Route path="/" element={<RestaurantsHome />} />
                </Routes>
            </main>
        </div>
    );
};

export default RestaurantsDashboard;
