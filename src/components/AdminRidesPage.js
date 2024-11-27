import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminRidesPage = () => {
  const [rides, setRides] = useState([]);
  const [drivers, setDrivers] = useState([]);

  // Base URL for API requests
  const baseURL =
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_BACKEND_URL || 'https://fare-backend-72dcc5cb3edd.herokuapp.com'
      : 'http://localhost:5000';

  // Fetch all rides (Admin route with authentication)
  const fetchRides = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/admin/rides`, {
        headers: { 'x-admin-password': 'admin123' }, // Send admin password
      });
      setRides(response.data);
    } catch (error) {
      console.error('Error fetching rides:', error.message);
    }
  };

  // Fetch all drivers
  const fetchDrivers = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/drivers`);
      setDrivers(response.data);
    } catch (error) {
      console.error('Error fetching drivers:', error.message);
    }
  };

  // Assign a driver to a specific ride
  const assignDriver = async (rideId, driverName) => {
    try {
      const response = await axios.put(
        `${baseURL}/api/admin/rides/${rideId}/assign-driver`,
        { driverName },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-admin-password': 'admin123', // Admin password in header
          },
        }
      );
      console.log('Driver assigned:', response.data);
      fetchRides(); // Refresh rides after assignment
    } catch (error) {
      console.error('Error assigning driver:', error.message);
    }
  };

  // Effect to authenticate admin and fetch data
  useEffect(() => {
    const isAdmin = window.prompt('Enter Admin Password') === 'admin123';
    if (!isAdmin) {
      alert('Unauthorized access');
      window.location.href = '/'; // Redirect unauthorized user to home page
    } else {
      fetchRides(); // Fetch all rides if admin is authenticated
      fetchDrivers(); // Fetch available drivers
    }
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Rides</h2>
      <ul className="list-group">
        {rides.length > 0 ? (
          rides.map((ride) => (
            <li key={ride._id} className="list-group-item mb-3">
              <strong>{ride.customerName}</strong> - {ride.pickupLocation} to {ride.dropoffLocation} <br />
              <em>Pickup Time:</em> {new Date(ride.pickupTime).toLocaleString()} <br />
              <em>Assigned Driver:</em> {ride.driverName || 'None'} <br />
              <div className="mt-2">
                <select
                  className="form-select"
                  onChange={(e) => assignDriver(ride._id, e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Driver
                  </option>
                  {drivers.map((driver) => (
                    <option key={driver._id} value={driver.name}>
                      {driver.name}
                    </option>
                  ))}
                </select>
              </div>
            </li>
          ))
        ) : (
          <li className="list-group-item">No rides available</li>
        )}
      </ul>
    </div>
  );
};

export default AdminRidesPage;
