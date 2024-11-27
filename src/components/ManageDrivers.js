import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });

  const baseURL = 'http://localhost:5000/api/drivers'; // Backend URL for managing drivers

  // Fetch drivers
  const fetchDrivers = async () => {
    try {
      const response = await axios.get(baseURL);
      setDrivers(response.data); // Populate drivers list
    } catch (error) {
      console.error('Error fetching drivers:', error.message);
    }
  };

  // Add a new driver
  const addDriver = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(baseURL, form, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Driver added successfully!');
      setForm({ name: '', phone: '', email: '' }); // Reset the form
      fetchDrivers(); // Refresh the drivers list
    } catch (error) {
      console.error('Error adding driver:', error.message);
    }
  };

  useEffect(() => {
    fetchDrivers(); // Fetch drivers when the component mounts
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Manage Drivers</h2>

      {/* Add Driver Form */}
      <div className="card shadow-sm p-3 mb-4">
        <h5 className="mb-3">Add New Driver</h5>
        <form onSubmit={addDriver}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Driver Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Add Driver</button>
        </form>
      </div>

      {/* Drivers List */}
      <div className="row">
        {drivers.length > 0 ? (
          drivers.map((driver) => (
            <div key={driver._id} className="col-md-4 mb-4">
              <div className="card shadow-sm p-3">
                <h5>{driver.name}</h5>
                <p><strong>Phone:</strong> {driver.phone}</p>
                <p><strong>Email:</strong> {driver.email}</p>
                <p><strong>Availability:</strong> {driver.isAvailable ? 'Available' : 'Unavailable'}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No drivers available</p>
        )}
      </div>
    </div>
  );
};

export default ManageDrivers;
