import React, { useState, useEffect } from "react";
import axios from "axios";

// Component cho địa điểm với input và dropdown
export const LocationInput = ({ placeholder, onLocationSelect, isFrom }) => {
  const [location, setLocation] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [flights, setFlights] = useState([]);

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
  const getUniqueLocations = () => {
    if (isFrom) {
      return [...new Set(flights.map((flight) => flight.from))]; // Địa điểm đi
    } else {
      return [...new Set(flights.map((flight) => flight.to))]; // Địa điểm đến
    }
  };

  // Lọc địa điểm
  const filterLocations = (value) => {
    const locations = getUniqueLocations();
    return locations.filter((loc) =>
      loc.toLowerCase().includes(value.toLowerCase())
    );
  };

  // Xử lý thay đổi địa điểm
  const handleChange = (value) => {
    setLocation(value);
    setDropdownVisible(true);
    setFilteredLocations(filterLocations(value));
  };

  // Xử lý chọn địa điểm
  const handleSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    setDropdownVisible(false);
    onLocationSelect(selectedLocation); // Gọi callback để thông báo cho parent
  };

  return (
    <div className="location-input">
      <input
        type="text"
        placeholder={placeholder}
        value={location}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setDropdownVisible(true)}
      />
      {dropdownVisible && filteredLocations.length > 0 && (
        <ul className="location-dropdown">
          {filteredLocations.map((loc, index) => (
            <li key={index} onClick={() => handleSelect(loc)}>
              {loc}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
