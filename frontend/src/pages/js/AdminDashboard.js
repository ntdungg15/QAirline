import React, { useState, useEffect } from "react";
import axios from "axios"; // Đảm bảo đã cài đặt axios
import "../css/adminDashboard.css";
import { authService } from "../../services/auth";
import AdminInfo from "../../admin/js/post_information";
import "../../admin/css/post_information.css";

const AdminDashboard = () => {
  const [flights, setFlights] = useState([]);
  const [flightData, setFlightData] = useState({
    flightNumber: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    availableSeats: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingFlightId, setEditingFlightId] = useState(null);

  // Hàm chuyển đổi timestamp
  const convertTimestamp = (timestamp) => {
    if (timestamp && timestamp._seconds) {
      return new Date(timestamp._seconds * 1000).toLocaleString();
    }
    return timestamp; // Trả về nguyên gốc nếu không phải timestamp
  };

  // Fetch flights từ backend
  const fetchFlights = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/flights");

      // Chuyển đổi timestamp trước khi set state
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Lấy user hiện tại
      const user = authService.getCurrentUser();

      if (!user) {
        console.error("Không có người dùng đăng nhập");
        return;
      }

      // Lấy token
      const token = await user.getIdToken();
      console.log("Token:", token); // Kiểm tra token

      // Chuyển đổi thời gian về dạng timestamp của Firestore nếu cần
      const submitData = {
        ...flightData,
        departureTime: new Date(flightData.departureTime),
        arrivalTime: new Date(flightData.arrivalTime),
      };

      // if (isEditing) {
      //   // Cập nhật chuyến bay
      //   await axios.put(
      //     `http://localhost:3000/api/flights/${editingFlightId}`,
      //     submitData
      //   );
      // } else {
      //   // Thêm chuyến bay mới
      //   await axios.post("http://localhost:3000/api/flights", submitData);
      // }

      // Gửi request với token
      const response = await axios.post(
        "http://localhost:3000/api/flights",
        submitData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Thêm chuyến bay thành công:", response.data);
      // Reset form và fetch lại danh sách chuyến bay
      setFlightData({
        flightNumber: "",
        from: "",
        to: "",
        departureTime: "",
        arrivalTime: "",
        price: "",
        availableSeats: "",
      });
      setIsEditing(false);
      setEditingFlightId(null);
      fetchFlights();
    } catch (error) {
      console.error("Error saving flight:", error);
    }
  };

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
    });
    setIsEditing(true);
    setEditingFlightId(flight.id);
  };

  // Phần UI
  const [activeTab, setActiveTab] = useState("flight");
  const handleTabClick = (tab) => {
    setActiveTab(tab); // Cập nhật tab hiện tại
    console.log(`Tab selected: ${tab}`);

  };


  return (
    <div className="admin-dashboard">
      <div className="admin-container">

        <div className="admin-sidebar">
          <div className="gradient-text">
            <span>AdminDashboard</span><br />
            <span>SunriseAirline</span>
          </div>

          <button
            className={`admin-tab ${activeTab === "flight" ? "active" : ""}`}
            onClick={() => handleTabClick("post-information")}
          >
            Đăng thông tin
          </button>

          <button
            className={`admin-tab ${activeTab === "admin-data-flight" ? "active" : ""}`}
            onClick={() => handleTabClick("admin-data-flight")}
          >
            Dữ liệu chuyến bay
          </button>

          <button
            className={`admin-tab ${activeTab === "plane-data" ? "active" : ""}`}
            onClick={() => handleTabClick("plane-data")}
          >
            Dữ liệu máy bay
          </button>

          <button
            className={`admin-tab ${activeTab === "statistics" ? "active" : ""}`}
            onClick={() => handleTabClick("statistics")}
          >
            Thống kê
          </button>

          <button
            className={`admin-tab ${activeTab === "change-time" ? "active" : ""}`}
            onClick={() => handleTabClick("change-time")}
          >
            Giờ khởi hành
          </button>
        </div>

        <div className="admin-menu" >
          {activeTab === "admin-data-flight" && (
            <div className="admin-data">
              <h1>Quản Lý Chuyến Bay</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="flightNumber"
                    placeholder="Mã chuyến bay"
                    value={flightData.flightNumber}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="from"
                    placeholder="Điểm đi"
                    value={flightData.from}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="to"
                    placeholder="Điểm đến"
                    value={flightData.to}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="datetime-local"
                    name="departureTime"
                    value={flightData.departureTime}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="datetime-local"
                    name="arrivalTime"
                    value={flightData.arrivalTime}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="number"
                    name="price"
                    placeholder="Giá vé"
                    value={flightData.price}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="number"
                    name="availableSeats"
                    placeholder="Số ghế trống"
                    value={flightData.availableSeats}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit">
                  {isEditing ? "Cập Nhật Chuyến Bay" : "Thêm Chuyến Bay"}
                </button>
              </form>

              <div className="flights-list">
                <h2>Danh Sách Chuyến Bay</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Mã Chuyến Bay</th>
                      <th>Điểm Đi</th>
                      <th>Điểm Đến</th>
                      <th>Giờ Đi</th>
                      <th>Giờ Đến</th>
                      <th>Giá</th>
                      <th>Ghế Trống</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flights.map((flight) => (
                      <tr key={flight.id}>
                        <td>{flight.flightNumber}</td>
                        <td>{flight.from}</td>
                        <td>{flight.to}</td>
                        <td>{flight.departureTime}</td>
                        <td>{flight.arrivalTime}</td>
                        <td>{flight.price}</td>
                        <td>{flight.availableSeats}</td>
                        <td>
                          <button onClick={() => handleEdit(flight)}>Sửa</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          )}

          {activeTab === "post-information" && <AdminInfo />}

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
