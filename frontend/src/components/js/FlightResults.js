import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const FlightResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fromLocation = queryParams.get("from");
  const toLocation = queryParams.get("to");
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/flights");
        setFlights(response.data); // Lưu tất cả dữ liệu chuyến bay vào state
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
    // Lọc chuyến bay dựa trên fromLocation và toLocation
    const filtered = flights.filter(
      (flight) => flight.from === fromLocation && flight.to === toLocation
    );
    setFilteredFlights(filtered); // Cập nhật state với chuyến bay đã lọc
  }, [flights, fromLocation, toLocation]); // Chạy lại khi flights, fromLocation hoặc toLocation thay đổi

  if (loading) {
    return <div>Đang tải...</div>; // Hiển thị thông báo tải
  }

  return (
    <div>
      <h1>
        Chuyến bay từ {fromLocation} đến {toLocation}
      </h1>
      {error && <p>{error}</p>} {/* Hiển thị thông báo lỗi nếu có */}
      {filteredFlights.length > 0 ? (
        <ul>
          {filteredFlights.map((flight) => (
            <li key={flight.id}>
              <p>Mã chuyến bay: {flight.flightNumber}</p>
              <p>Điểm đi: {flight.from}</p>
              <p>Điểm đến: {flight.to}</p>
              <p>Giờ đi: {flight.departureTime}</p>
              <p>Giờ đến: {flight.arrivalTime}</p>
              <p>Giá: {flight.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Không tìm thấy chuyến bay nào.</p> // Thông báo nếu không có chuyến bay
      )}
    </div>
  );
};

export default FlightResults;
