import React, { useState, useEffect } from 'react';
import './AdminRestaurants.css';
import axios from 'axios';

const initialFormState = {
    restaurantId: '',
    name: '',
    address: '',
    phone: '',
    gmail: '',
    password: ''
};

const AdminRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [form, setForm] = useState(initialFormState);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/restaurants');
            const sortedRestaurants = response.data.sort((a, b) => a.restaurantId - b.restaurantId);
            setRestaurants(sortedRestaurants);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };

    const addRestaurant = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/admin/restaurants', form);
            setRestaurants([...restaurants, response.data]);
            setForm(initialFormState);
            setError('');
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.error === 'Gmail already exists') {
                setError('Duplicate Gmail! Please use a different Gmail.');
            } else {
                console.error('Error adding restaurant:', error);
            }
        }
    };

    const updateRestaurant = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/admin/restaurants/${form.restaurantId}`, form);
            setRestaurants(restaurants.map((restaurant) =>
                restaurant.restaurantId === response.data.restaurantId ? response.data : restaurant
            ));
            setForm(initialFormState);
            setIsEditing(false);
            setError('');
        } catch (error) {
            console.error('Error updating restaurant:', error);
        }
    };

    const deleteRestaurant = async (restaurantId) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/restaurants/${restaurantId}`);
            setRestaurants(restaurants.filter((restaurant) => restaurant.restaurantId !== restaurantId));
        } catch (error) {
            console.error('Error deleting restaurant:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            updateRestaurant();
        } else {
            addRestaurant();
        }
    };

    const handleEdit = (restaurant) => {
        setForm(restaurant);
        setIsEditing(true);
        setError('');
    };

    return (
        <div className="admin-restaurants">
            <h2>Manage Restaurants</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="restaurantId" value={form.restaurantId} onChange={(e) => setForm({ ...form, restaurantId: e.target.value })} placeholder="Restaurant ID" required />
                <input type="text" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" required />
                <input type="text" name="address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Address" required />
                <input type="text" name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" required />

                {/* Render gmail and password fields only when adding a new restaurant */}
                {!isEditing && (
                    <>
                        <input type="email" name="gmail" value={form.gmail} onChange={(e) => setForm({ ...form, gmail: e.target.value })} placeholder="Gmail" required />
                        <input type="password" name="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" required />
                    </>
                )}

                <button type="submit">{isEditing ? 'Update' : 'Add'} Restaurant</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <div className="restaurant-list">
                {restaurants.map((restaurant) => (
                    <div key={restaurant.restaurantId} className="restaurant-item">
                        <div className="restaurant-info">
                            <p><strong>Id:</strong>{restaurant.restaurantId}</p>
                            <h3>{restaurant.name}</h3>
                            <p><strong>Address:</strong> {restaurant.address}</p>
                            <p><strong>Phone:</strong> {restaurant.phone}</p>
                            <p><strong>Gmail:</strong> {restaurant.gmail}</p>
                        </div>
                        <div className="actions">
                            <button onClick={() => handleEdit(restaurant)}>Edit</button>
                            <button onClick={() => deleteRestaurant(restaurant.restaurantId)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminRestaurants;
