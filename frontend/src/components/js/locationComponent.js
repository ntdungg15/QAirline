// src/components/js/locationComponent.js
import React, { useState, useEffect } from "react";
import axios from "axios";

// Hook để quản lý logic tìm kiếm và dropdown
export const useLocationSearch = () => {
  const [flights, setFlights] = useState([]);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [fromDropdown, setFromDropdown] = useState(false);
  const [toDropdown, setToDropdown] = useState(false);
  const [fromFilteredLocations, setFromFilteredLocations] = useState([]);
  const [toFilteredLocations, setToFilteredLocations] = useState([]);

  // Fetch flights từ API
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/flights");
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  // Lấy các địa điểm duy nhất
  const getUniqueLocations = (flights) => {
    const fromLocations = [...new Set(flights.map((flight) => flight.from))];
    const toLocations = [...new Set(flights.map((flight) => flight.to))];
    return { fromLocations, toLocations };
  };

  // Lọc địa điểm
  const filterLocations = (locations, value) => {
    return locations.filter((location) =>
      location.toLowerCase().includes(value.toLowerCase())
    );
  };

  // Xử lý thay đổi địa điểm From
  const handleFromLocationChange = (value) => {
    setFromLocation(value);
    setFromDropdown(true);

    const { fromLocations } = getUniqueLocations(flights);
    const filtered = filterLocations(fromLocations, value);
    setFromFilteredLocations(filtered);
  };

  // Xử lý thay đổi địa điểm To
  const handleToLocationChange = (value) => {
    setToLocation(value);
    setToDropdown(true);

    const { toLocations } = getUniqueLocations(flights);
    const filtered = filterLocations(toLocations, value);
    setToFilteredLocations(filtered);
  };

  // Xử lý chọn địa điểm From
  const handleFromLocationSelect = (location) => {
    setFromLocation(location);
    setFromDropdown(false);
  };

  // Xử lý chọn địa điểm To
  const handleToLocationSelect = (location) => {
    setToLocation(location);
    setToDropdown(false);
  };

  // Xử lý swap location
  const handleSwapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  return {
    fromLocation,
    toLocation,
    fromDropdown,
    toDropdown,
    fromFilteredLocations,
    toFilteredLocations,
    handleFromLocationChange,
    handleToLocationChange,
    handleFromLocationSelect,
    handleToLocationSelect,
    handleSwapLocations,
  };
};

// Component dropdown cho địa điểm
export const LocationDropdown = ({ locations, onLocationSelect, show }) => {
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
