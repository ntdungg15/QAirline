import { useState, useEffect } from "react";
import axios from "axios";
import { authService } from "../services/auth";

const useAdminFlights = () => {
  const [flights, setFlights] = useState([]);
  const [flightData, setFlightData] = useState({
    flightNumber: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    availableSeats: 0,
    aircraft: "",
    manufacturer: "",
    status: "On Time",
    economySeatsTotal: 0,
    economySeatsPrice: 0,
    businessSeatsTotal: 0,
    businessSeatsPrice: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingFlightId, setEditingFlightId] = useState(null);

  // Hàm chuyển đổi timestamp
  const convertTimestamp = (timestamp) => {
    if (timestamp && timestamp._seconds) {
      return new Date(timestamp._seconds * 1000).toLocaleString();
    }
    return timestamp;
  };

  // Fetch flights từ backend
  const fetchFlights = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/flights");
      const convertedFlights = response.data.map((flight) => ({
        ...flight,
        departureTime: convertTimestamp(flight.departureTime),
        arrivalTime: convertTimestamp(flight.arrivalTime),
      }));
      setFlights(convertedFlights);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Hàm thêm mới chuyến bay
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = authService.getCurrentUser();
      if (!user) {
        console.error("No user is logged in");
        return;
      }
      const token = await user.getIdToken();
      const submitData = {
        ...flightData,
        departureTime: new Date(flightData.departureTime),
        arrivalTime: new Date(flightData.arrivalTime),
        economySeats: {
          total: parseInt(flightData.economySeatsTotal),
          available: parseInt(flightData.economySeatsTotal),
          price: parseFloat(flightData.economySeatsPrice),
        },
        businessSeats: {
          total: parseInt(flightData.businessSeatsTotal),
          available: parseInt(flightData.businessSeatsTotal),
          price: parseFloat(flightData.businessSeatsPrice),
        },
      };

      let response;
      if (isEditing) {
        response = await axios.put(
          `http://localhost:3000/api/flights/${editingFlightId}`,
          submitData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:3000/api/flights",
          submitData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      console.log(isEditing ? "Flight updated" : "Flight added", response.data);

      // Reset form và fetch lại danh sách chuyến bay
      setFlightData({
        flightNumber: "",
        from: "",
        to: "",
        departureTime: "",
        arrivalTime: "",
        price: "",
        availableSeats: "",
        aircraft: "",
        manufacturer: "",
        status: "On Time",
        economySeatsTotal: 0,
        economySeatsPrice: 0,
        businessSeatsTotal: 0,
        businessSeatsPrice: 0,
      });
      setIsEditing(false);
      setEditingFlightId(null);
      fetchFlights();
    } catch (error) {
      console.error("Error saving flight:", error);
    }
  };

  // Chỉnh sửa chuyến bay
  const handleEdit = (flight) => {
    setFlightData({
      flightNumber: flight.flightNumber,
      from: flight.from,
      to: flight.to,
      departureTime:
        flight.departureTime instanceof Date
          ? flight.departureTime.toISOString().slice(0, 16)
          : flight.departureTime,
      arrivalTime:
        flight.arrivalTime instanceof Date
          ? flight.arrivalTime.toISOString().slice(0, 16)
          : flight.arrivalTime,
      price: flight.price,
      availableSeats: flight.availableSeats,
      aircraft: flight.aircraft || "",
      manufacturer: flight.manufacturer || "",
      status: flight.status || "On Time",
      economySeatsTotal: flight.economySeats?.total || 0,
      economySeatsPrice: flight.economySeats?.price || 0,
      businessSeatsTotal: flight.businessSeats?.total || 0,
      businessSeatsPrice: flight.businessSeats?.price || 0,
    });
    setIsEditing(true);
    setEditingFlightId(flight.id);
  };

  // Xóa chuyến bay
  const handleDelete = async (flightId) => {
    try {
      const user = authService.getCurrentUser();
      if (!user) {
        console.error("No user is logged in");
        return;
      }
      const token = await user.getIdToken();
      await axios.delete(`http://localhost:3000/api/flights/${flightId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchFlights();
      alert("Flight deleted successfully");
    } catch (error) {
      console.error("Error deleting flight:", error);
    }
  };

  const handleDelay = async (flightId) => {
    const delayTime = prompt("Enter delay time in minutes:");
    if (delayTime) {
      try {
        const user = authService.getCurrentUser();
        if (!user) {
          console.error("No user is logged in");
          return;
        }
        const token = await user.getIdToken();
        await axios.patch(
          `http://localhost:3000/api/flights/${flightId}/delay`,
          { delayTime: parseInt(delayTime) },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        fetchFlights();
        alert(`Flight delayed by ${delayTime} minutes`);
      } catch (error) {
        console.error("Error delaying flight:", error);
      }
    }
  };

  return {
    flights,
    flightData,
    isEditing,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleDelay,
  };
};

export default useAdminFlights;
