import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RideDetails = () => {
    const { id } = useParams(); // Get the ride ID from the URL
    const [ride, setRide] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRide = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/rides/${id}`);
                setRide(response.data); // Save the ride data to state
            } catch (error) {
                console.error('Error fetching ride details:', error.message);
            } finally {
                setLoading(false); // Stop the loading spinner
            }
        };

        fetchRide();
    }, [id]);

    if (loading) {
        return <p>Loading ride details...</p>;
    }

    if (!ride) {
        return <p>Ride not found.</p>;
    }

    return (
        <div>
            <h1>Ride Details</h1>
            <p><strong>Customer Name:</strong> {ride.customerName}</p>
            <p><strong>Phone:</strong> {ride.phone}</p>
            <p><strong>Email:</strong> {ride.email}</p>
            <p><strong>Pickup Location:</strong> {ride.pickupLocation}</p>
            <p><strong>Dropoff Location:</strong> {ride.dropoffLocation}</p>
            <p><strong>Pickup Time:</strong> {new Date(ride.pickupTime).toLocaleString()}</p>
        </div>
    );
};

export default RideDetails; // Ensure this is placed at the top level of the file
