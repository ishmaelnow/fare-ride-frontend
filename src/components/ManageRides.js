import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageRides = () => {
  const [rides, setRides] = useState([]);
  const [drivers, setDrivers] = useState([]);

  // Fetch rides and drivers on component mount
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rides');
        setRides(response.data); // Save rides to state
      } catch (error) {
        console.error('Error fetching rides:', error.message);
      }
    };

    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/drivers');
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
      await axios.put(`http://localhost:5000/api/rides/${rideId}/assign-driver`, { driverName });
      alert('Driver assigned successfully!');
      // Update the rides state to reflect the change
      setRides((prevRides) =>
        prevRides.map((ride) =>
          ride._id === rideId ? { ...ride, driverName } : ride
        )
      );
    } catch (error) {
      console.error('Error assigning driver:', error.message);
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
              <p>
                <strong>Pickup Location:</strong> {ride.pickupLocation}
              </p>
              <p>
                <strong>Dropoff Location:</strong> {ride.dropoffLocation}
              </p>
              <p>
                <strong>Pickup Time:</strong>{' '}
                {new Date(ride.pickupTime).toLocaleString()} {/* Convert to readable date */}
              </p>
              <p>
                <strong>Assigned Driver:</strong>{' '}
                {ride.driverName || 'Not Assigned'}
              </p>
              <div>
                <select
                  className="form-select mb-3"
                  onChange={(e) => assignDriver(ride._id, e.target.value)}
                >
                  <option value="">Assign Driver</option>
                  {drivers.map((driver) => (
                    <option key={driver._id} value={driver.name}>
                      {driver.name}
                    </option>
                  ))}
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
