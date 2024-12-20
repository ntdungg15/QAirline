import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useBookTicket = (fromLocation, toLocation) => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("flight");
  const [locations, setLocations] = useState({
    fromLocation: "",
    toLocation: "",
  });

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/flights");
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
        setError("Đã xảy ra lỗi khi tìm kiếm chuyến bay.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  useEffect(() => {
    const filtered = flights.filter(
      (flight) => flight.from === fromLocation && flight.to === toLocation
    );
    setFilteredFlights(filtered);
  }, [flights, fromLocation, toLocation]);

  const handleFromLocationSelect = (location) => {
    setLocations((prev) => ({
      ...prev,
      fromLocation: location,
    }));
  };

  const handleToLocationSelect = (location) => {
    setLocations((prev) => ({
      ...prev,
      toLocation: location,
    }));
  };

  const handleSelectClass = (flight, seatClass) => {
    setSelectedFlight(flight);
    setSelectedClass(seatClass);
  };

  const handleSearchFlights = () => {
    const { fromLocation, toLocation } = locations;
    const url = `/user/book-ticket?from=${fromLocation}&to=${toLocation}`;
    window.open(url, "_blank");
  };

  const handleBookTicket = () => {
    if (selectedFlight && selectedClass) {
      const bookingDetails = {
        flight: {
          ...selectedFlight,
          departureTime: selectedFlight.departureTime,
          arrivalTime: selectedFlight.arrivalTime,
          flightNumber: selectedFlight.flightNumber,
          from: selectedFlight.from,
          to: selectedFlight.to,
        },
        seatClass: selectedClass,
        price:
          selectedClass === "economy"
            ? Number(selectedFlight.economySeats.price)
            : Number(selectedFlight.businessSeats.price),
        availableSeats:
          selectedClass === "economy"
            ? selectedFlight.economySeats.available
            : selectedFlight.businessSeats.available,
        status: "Active",
        flightId: selectedFlight.id,
      };

      navigate("/user/shopping-cart", {
        state: { bookingDetails },
      });
    }
  };

  return {
    flights,
    filteredFlights,
    selectedFlight,
    selectedClass,
    loading,
    error,
    activeTab,
    locations,
    handleFromLocationSelect,
    handleToLocationSelect,
    handleSelectClass,
    handleSearchFlights,
    handleBookTicket,
    setActiveTab,
  };
};
