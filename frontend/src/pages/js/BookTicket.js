// src/pages/js/BookTicket.js
import React, { useState } from "react";
import axios from "axios";

const BookTicket = () => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengerClass, setPassengerClass] = useState("Economy");
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");

  const handleSearchFlights = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/flights/search`,
        {
          params: {
            from: fromLocation,
            to: toLocation,
            departDate,
            returnDate,
          },
        }
      );
      setFlights(response.data);
      setError("");
    } catch (err) {
      setError("Error fetching flights. Please try again.");
    }
  };

  const handleBookTicket = async (flightId) => {
    // Logic to book the ticket
    // You can call your booking API here
  };

  return (
    <div>
      <h1>Book a Flight</h1>
      <div>
        <input
          type="text"
          placeholder="From"
          value={fromLocation}
          onChange={(e) => setFromLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="To"
          value={toLocation}
          onChange={(e) => setToLocation(e.target.value)}
        />
        <input
          type="date"
          value={departDate}
          onChange={(e) => setDepartDate(e.target.value)}
        />
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
        <select
          value={passengerClass}
          onChange={(e) => setPassengerClass(e.target.value)}
        >
          <option value="Economy">Economy</option>
          <option value="Business">Business</option>
        </select>
        <button onClick={handleSearchFlights}>Search Flights</button>
      </div>
      {error && <p>{error}</p>}
      <div>
        {flights.length > 0 ? (
          <ul>
            {flights.map((flight) => (
              <li key={flight.id}>
                <p>Flight Number: {flight.flightNumber}</p>
                <p>From: {flight.from}</p>
                <p>To: {flight.to}</p>
                <p>Departure: {flight.departureTime}</p>
                <p>Arrival: {flight.arrivalTime}</p>
                <p>Price: {flight.price}</p>
                <button onClick={() => handleBookTicket(flight.id)}>
                  Book Now
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No flights found.</p>
        )}
      </div>
    </div>
  );
};

export default BookTicket;
