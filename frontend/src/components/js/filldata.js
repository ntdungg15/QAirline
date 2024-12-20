import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/filldata.css";

const FillData = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    departure: "",
    destination: "",
    date: "",
    passengers: 1,
  });
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Booking information submitted successfully!");
  };

  const handlePayment = () => {
    setLoading(true); 
    setTimeout(() => {
      navigate("/payment"); 
    }, 500); 
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="filldata-container">
      <h2>Flight Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="filldata-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="filldata-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="filldata-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="filldata-group">
          <label>Departure City:</label>
          <input
            type="text"
            name="departure"
            value={formData.departure}
            onChange={handleChange}
            required
          />
        </div>
        <div className="filldata-group">
          <label>Destination City:</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </div>
        <div className="filldata-group">
          <label>Travel Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="filldata-group">
          <label>Number of Passengers:</label>
          <input
            type="number"
            name="passengers"
            value={formData.passengers}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <button type="button" onClick={handlePayment} className="filldata-submit-button">
          Thanh Toán
        </button>
      </form>
    </div>
  );
};

export default FillData;
