import React, { useState, useEffect } from "react";
import axios from "axios"; // Đảm bảo đã cài đặt axios
import "../css/adminDashboard.css";
import { authService } from "../../services/auth";
import AdminInfo from "../../admin/js/post_information";
import AdminPlane from "../../admin/js/plane";
import "../../admin/css/post_information.css";
import useAdminFlights from "../../hooks/useAdminFlights";

const AdminDashboard = () => {
  const {
    flights,
    flightData,
    isEditing,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleDelay,
  } = useAdminFlights();

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
            <span>AdminDashboard</span>
            <br />
            <span>SunriseAirline</span>
          </div>

          <button
            className={`admin-tab ${
              activeTab === "post-information" ? "active" : ""
            }`}
            onClick={() => handleTabClick("post-information")}
          >
            Đăng thông tin
          </button>

          <button
            className={`admin-tab ${
              activeTab === "admin-data-flight" ? "active" : ""
            }`}
            onClick={() => handleTabClick("admin-data-flight")}
          >
            Dữ liệu chuyến bay
          </button>

          <button
            className={`admin-tab ${
              activeTab === "plane-data" ? "active" : ""
            }`}
            onClick={() => handleTabClick("plane-data")}
          >
            Dữ liệu máy bay
          </button>

          <button
            className={`admin-tab ${
              activeTab === "statistics" ? "active" : ""
            }`}
            onClick={() => handleTabClick("statistics")}
          >
            Thống kê
          </button>

          <button
            className={`admin-tab ${
              activeTab === "change-time" ? "active" : ""
            }`}
            onClick={() => handleTabClick("change-time")}
          >
            Giờ khởi hành
          </button>
        </div>

        <div className="admin-menu">
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
                  {" "}
                  <input
                    type="number"
                    name="economySeatsPrice"
                    placeholder="Giá vé Phổ Thông"
                    value={flightData.economySeatsPrice}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="number"
                    name="businessSeatsPrice"
                    placeholder="Giá vé Thương Gia"
                    value={flightData.businessSeatsPrice}
                    onChange={handleChange}
                    required
                  />{" "}
                  <input
                    type="number"
                    name="availableSeats"
                    placeholder="Số ghế trống"
                    value={flightData.availableSeats}
                    onChange={handleChange}
                    required
                  />{" "}
                </div>{" "}
                <div className="form-group">
                  {" "}
                  <input
                    type="text"
                    name="aircraft"
                    placeholder="Tàu Bay"
                    value={flightData.aircraft}
                    onChange={handleChange}
                    required
                  />{" "}
                  <input
                    type="text"
                    name="manufacturer"
                    placeholder="Hãng Sản Xuất"
                    value={flightData.manufacturer}
                    onChange={handleChange}
                    required
                  />{" "}
                  <input
                    type="text"
                    name="status"
                    placeholder="Trạng Thái"
                    value={flightData.status}
                    onChange={handleChange}
                    required
                  />{" "}
                </div>{" "}
                <div className="form-group">
                  {" "}
                  <input
                    type="number"
                    name="economySeatsTotal"
                    placeholder="Tổng Ghế Phổ Thông"
                    value={flightData.economySeatsTotal}
                    onChange={handleChange}
                    required
                  />{" "}
                  <input
                    type="number"
                    name="businessSeatsTotal"
                    placeholder="Tổng Ghế Thương Gia"
                    value={flightData.businessSeatsTotal}
                    onChange={handleChange}
                    required
                  />{" "}
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
                      <th>Giá (Phổ Thông)</th> <th>Giá (Thương Gia)</th>{" "}
                      <th>Số Ghế Còn Lại</th> <th>Tàu Bay</th>{" "}
                      <th>Hãng Sản Xuất</th> <th>Trạng Thái</th>{" "}
                      <th>Tổng Ghế Phổ Thông</th> <th>Ghế Phổ Thông Còn Lại</th>{" "}
                      <th>Tổng Ghế Thương Gia</th>{" "}
                      <th>Ghế Thương Gia Còn Lại</th>
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
                        <td>{flight.economySeats.price}</td>{" "}
                        <td>{flight.businessSeats.price}</td>{" "}
                        <td>{flight.availableSeats}</td>{" "}
                        <td>{flight.aircraft}</td>{" "}
                        <td>{flight.manufacturer}</td> <td>{flight.status}</td>{" "}
                        <td>{flight.economySeats.total}</td>{" "}
                        <td>{flight.economySeats.available}</td>{" "}
                        <td>{flight.businessSeats.total}</td>{" "}
                        <td>{flight.businessSeats.available}</td>
                        <td>
                          <button onClick={() => handleEdit(flight)}>
                            Sửa
                          </button>
                          <button onClick={() => handleDelete(flight.id)}>
                            Xóa
                          </button>
                          <button onClick={() => handleDelay(flight.id)}>
                            Delay
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "post-information" && <AdminInfo />}
          {activeTab === "plane-data" && <AdminPlane />}
          {activeTab === "statistics" && <AdminInfo />}
          {activeTab === "change-time" && <AdminInfo />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;