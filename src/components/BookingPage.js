import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import './BookingPage.css'; // Import custom styles

const BookingPage = () => {
  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    email: '',
    pickupLocation: '',
    dropoffLocation: '',
    pickupTime: '',
  });

  const [currentRide, setCurrentRide] = useState(null); // Store the booked ride

  // Dynamically determine backend URL based on environment
  const baseURL =
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_BACKEND_URL || 'https://fare-backend-72dcc5cb3edd.herokuapp.com' // Use environment variable or fallback to production URL
      : 'http://localhost:5000'; // Development URL for local testing

  // Book a ride
  const bookRide = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/api/rides`, form, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Ride booked:', response.data);
      setCurrentRide(response.data); // Save the booked ride to state
      alert('Ride successfully booked! Check your confirmation below.');
      setForm({
        customerName: '',
        phone: '',
        email: '',
        pickupLocation: '',
        dropoffLocation: '',
        pickupTime: '',
      });
    } catch (error) {
      console.error('Error booking ride:', error.message);
      alert('Failed to book the ride. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow mb-4">
        <div className="card-body">
          <h2 className="text-center mb-4">Book a Ride</h2>
          <form onSubmit={bookRide}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Customer Name"
                value={form.customerName}
                onChange={(e) => setForm({ ...form, customerName: e.target.value })}
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
                type="text"
                className="form-control"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Pickup Location"
                value={form.pickupLocation}
                onChange={(e) => setForm({ ...form, pickupLocation: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Dropoff Location"
                value={form.dropoffLocation}
                onChange={(e) => setForm({ ...form, dropoffLocation: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="datetime-local"
                className="form-control"
                value={form.pickupTime}
                onChange={(e) => setForm({ ...form, pickupTime: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Book Ride</button>
          </form>
        </div>
      </div>

      {/* Display the current ride confirmation */}
      {currentRide && (
        <div className="card shadow mt-4">
          <div className="card-body">
            <h2 className="text-center mb-4">Your Ride Confirmation</h2>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Ride ID:</strong> {currentRide._id}
              </li>
              <li className="list-group-item">
                <strong>Customer Name:</strong> {currentRide.customerName}
              </li>
              <li className="list-group-item">
                <strong>Phone:</strong> {currentRide.phone}
              </li>
              <li className="list-group-item">
                <strong>Email:</strong> {currentRide.email}
              </li>
              <li className="list-group-item">
                <strong>Pickup Location:</strong> {currentRide.pickupLocation}
              </li>
              <li className="list-group-item">
                <strong>Dropoff Location:</strong> {currentRide.dropoffLocation}
              </li>
              <li className="list-group-item">
                <strong>Pickup Time:</strong> {new Date(currentRide.pickupTime).toLocaleString()}
              </li>
              <li className="list-group-item">
                <strong>Assigned Driver:</strong> {currentRide.driverName || 'Not Assigned'}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
