import axios from "axios";
import React, { useState, useEffect } from "react";

export const fetchFlights = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/flights");
    return response.data;
  } catch (error) {
    console.error("Error fetching flights:", error);
    return [];
  }
};

export const getUniqueLocations = (flights) => {
  return [...new Set(flights.map((flight) => flight.from))];
};

export const filterLocations = (locations, value) => {
  return locations.filter((location) =>
    location.toLowerCase().includes(value.toLowerCase())
  );
};

export const useLocationSearch = () => {
  const [flights, setFlights] = useState([]);
  const [fromLocation, setFromLocation] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);

  useEffect(() => {
    const loadFlights = async () => {
      const flightsData = await fetchFlights();
      setFlights(flightsData);
    };

    loadFlights();
  }, []);

  const handleFromLocationChange = (value) => {
    setFromLocation(value);
    setShowDropdown(true);

    const uniqueLocations = getUniqueLocations(flights);
    const filtered = filterLocations(uniqueLocations, value);
    setFilteredLocations(filtered);
  };

  const handleLocationSelect = (location) => {
    setFromLocation(location);
    setShowDropdown(false);
  };

  return {
    fromLocation,
    showDropdown,
    filteredLocations,
    handleFromLocationChange,
    handleLocationSelect,
    setShowDropdown,
  };
};

// Dropdown Component
export const userComponent = ({ locations, onLocationSelect, show }) => {
  if (!show || locations.length === 0) return null;

  return (
    <ul className="location-dropdown">
      {locations.map((location, index) => (
        <li key={index} onClick={() => onLocationSelect(location)}>
          {location}
        </li>
      ))}
    </ul>
  );
};
