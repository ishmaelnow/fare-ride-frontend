import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageRides = () => {
  const [rides, setRides] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const baseURL = 'http://localhost:5000/api'; // Backend base URL

  // Fetch rides and drivers on component mount
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.get(`${baseURL}/rides`);
        setRides(response.data); // Save rides to state
      } catch (error) {
        console.error('Error fetching rides:', error.message);
      }
    };

    const fetchDrivers = async () => {
      try {
        const response = await axios.get(`${baseURL}/drivers`);
        setDrivers(response.data); // Save drivers to state
      } catch (error) {
        console.error('Error fetching drivers:', error.message);
      }
    };

    fetchRides();
    fetchDrivers();
  }, []);

  // Assign a driver to a ride
  const assignDriver = async (rideId, driverName) => {
    try {
      const response = await axios.put(`${baseURL}/rides/${rideId}/assign-driver`, { driverName });
      alert('Driver assigned successfully!');
      setRides((prevRides) =>
        prevRides.map((ride) =>
          ride._id === rideId ? { ...ride, driverName: response.data.driverName } : ride
        )
      );
    } catch (error) {
      console.error('Error assigning driver:', error.message);
    }
  };

  // Update ride status
  const updateRideStatus = async (rideId, status) => {
    try {
      const response = await axios.put(`${baseURL}/rides/${rideId}/status`, { status });
      alert('Ride status updated successfully!');
      setRides((prevRides) =>
        prevRides.map((ride) =>
          ride._id === rideId ? { ...ride, status: response.data.status } : ride
        )
      );
    } catch (error) {
      console.error('Error updating ride status:', error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Manage Rides</h2>
      <div className="row">
        {rides.map((ride) => (
          <div key={ride._id} className="col-md-6 mb-4">
            <div className="card shadow-sm p-3">
              <h5 className="card-title">{ride.customerName}</h5>
              <p><strong>Pickup Location:</strong> {ride.pickupLocation}</p>
              <p><strong>Dropoff Location:</strong> {ride.dropoffLocation}</p>
              <p><strong>Pickup Time:</strong> {new Date(ride.pickupTime).toLocaleString()}</p>
              <p><strong>Assigned Driver:</strong> {ride.driverName || 'Not Assigned'}</p>
              <p><strong>Status:</strong> {ride.status || 'Pending'}</p>
              <div className="mb-3">
                <label className="form-label">Assign Driver:</label>
                <select
                  className="form-select"
                  onChange={(e) => assignDriver(ride._id, e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {ride.driverName || 'Select Driver'}
                  </option>
                  {drivers.map((driver) => (
                    <option key={driver._id} value={driver.name}>
                      {driver.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Update Status:</label>
                <select
                  className="form-select"
                  onChange={(e) => updateRideStatus(ride._id, e.target.value)}
                  defaultValue={ride.status || 'Pending'}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRides;
