import React, { useState } from "react";
import "../css/adminDashboard.css";
import AdminInfo from "../../admin/js/post_information";
import AdminPlane from "../../admin/js/plane";
import BookingStats from "../../admin/js/BookingStats";
import useAdminFlights from "../../hooks/useAdminFlights";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authService } from "../../services/auth";

const AdminDashboard = () => {
  const {
    flights,
    flightData,
    aircrafts,
    isEditing,
    handleChange,
    handleAircraftSelect,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleDelay,
  } = useAdminFlights();

  const navigate = useNavigate();
  // hàm xử lý đăng xuất

  const handleLogout = async () => {
    try {
      await authService.logout(); // Gọi trực tiếp từ authService
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Phần UI
  const [activeTab, setActiveTab] = useState("admin-data-flight");
  const handleTabClick = (tab) => {
    setActiveTab(tab); // Cập nhật tab hiện tại
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
              activeTab === "admin-data-flight" ? "active" : ""
            }`}
            onClick={() => handleTabClick("admin-data-flight")}
          >
            Dữ liệu chuyến bay
          </button>

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
              activeTab === "plane-data" ? "active" : ""
            }`}
            onClick={() => handleTabClick("plane-data")}
          >
            Dữ liệu máy bay
          </button>

          <button
            className={`admin-tab ${
              activeTab === "booking-stats" ? "active" : ""
            }`}
            onClick={() => handleTabClick("booking-stats")}
          >
            Thống kê đặt vé
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
          <button className="admin-tab logout-button" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>

        <div className="admin-menu">
          {activeTab === "admin-data-flight" && (
            <div className="admin-data">
              {/* Header Section */}
              <div className="admin-header">
                <h1>Quản Lý Chuyến Bay</h1>
                <p className="admin-subtitle">
                  Thêm và quản lý thông tin chuyến bay
                </p>
              </div>

              {/* Form Section */}
              <div className="admin-form-container">
                <h3 className="form-main-title">
                  {isEditing ? "Cập Nhật Chuyến Bay" : "Thêm Chuyến Bay"}
                </h3>

                <form onSubmit={handleSubmit}>
                  {/* Flight Details Section */}
                  <div className="form-section">
                    <div className="form-row">
                      <div className="form-field">
                        <label>Mã chuyến bay</label>
                        <input
                          type="text"
                          name="flightNumber"
                          placeholder="VD: VN001"
                          value={flightData.flightNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label>Trạng thái</label>
                        <select
                          name="status"
                          value={flightData.status}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Chọn trạng thái</option>
                          <option value="On-time">On Time</option>
                          <option value="Delayed">Delayed</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Route Information */}
                  <div className="form-section">
                    <h3 className="form-section-title">Thông tin hành trình</h3>
                    <div className="form-row">
                      <div className="form-field">
                        <label>Điểm khởi hành</label>
                        <input
                          type="text"
                          name="from"
                          placeholder="VD: Hà Nội"
                          value={flightData.from}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label>Điểm đến</label>
                        <input
                          type="text"
                          name="to"
                          placeholder="VD: TP.HCM"
                          value={flightData.to}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-field">
                        <label>Thời gian khởi hành</label>
                        <input
                          type="datetime-local"
                          name="departureTime"
                          value={flightData.departureTime}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label>Thời gian đến</label>
                        <input
                          type="datetime-local"
                          name="arrivalTime"
                          value={flightData.arrivalTime}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Aircraft Information */}
                  <div className="form-section">
                    <h3 className="form-section-title">Thông tin máy bay</h3>
                    <div className="form-row">
                      <div className="form-field">
                        <label>Mã máy bay</label>
                        <select
                          name="aircraft"
                          value={flightData.aircraft}
                          onChange={handleAircraftSelect}
                          required
                        >
                          <option value="">Chọn máy bay</option>
                          {aircrafts.map((aircraft) => (
                            <option key={aircraft.id} value={aircraft.model}>
                              {aircraft.model}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-field">
                        <label>Hãng sản xuất</label>
                        <input
                          type="text"
                          name="manufacturer"
                          value={flightData.manufacturer}
                          readOnly
                          className="readonly-input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Updated Seat Information Section */}
                  <div className="form-section">
                    <h3 className="form-section-title">
                      Thông tin ghế và giá vé
                    </h3>
                    <div className="form-row">
                      <div className="form-field">
                        <label>Tổng ghế phổ thông</label>
                        <input
                          type="number"
                          name="economySeatsTotal"
                          value={flightData.economySeatsTotal}
                          readOnly
                          className="readonly-input"
                        />
                      </div>
                      <div className="form-field">
                        <label>Giá vé phổ thông (VND)</label>
                        <input
                          type="number"
                          name="economySeatsPrice"
                          placeholder="VD: 1500000"
                          value={flightData.economySeatsPrice}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-field">
                        <label>Tổng ghế thương gia</label>
                        <input
                          type="number"
                          name="businessSeatsTotal"
                          value={flightData.businessSeatsTotal}
                          readOnly
                          className="readonly-input"
                        />
                      </div>
                      <div className="form-field">
                        <label>Giá vé thương gia (VND)</label>
                        <input
                          type="number"
                          name="businessSeatsPrice"
                          placeholder="VD: 3500000"
                          value={flightData.businessSeatsPrice}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="submit-button">
                    {isEditing ? "Cập Nhật Chuyến Bay" : "Thêm Chuyến Bay"}
                  </button>
                </form>
              </div>

              {/* Flight List Section */}
              <div className="flights-list">
                <h2>Danh Sách Chuyến Bay</h2>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Mã Chuyến Bay</th>
                        <th>Điểm Đi</th>
                        <th>Điểm Đến</th>
                        <th>Giờ Đi</th>
                        <th>Giờ Đến</th>
                        <th>Giá (Phổ Thông)</th>
                        <th>Giá (Thương Gia)</th>

                        <th>Tàu Bay</th>
                        <th>Hãng Sản Xuất</th>
                        <th>Trạng Thái</th>
                        <th>Tổng Ghế Phổ Thông</th>
                        <th>Ghế Phổ Thông Còn Lại</th>
                        <th>Tổng Ghế Thương Gia</th>
                        <th>Ghế Thương Gia Còn Lại</th>
                        <th>Thao tác</th>
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
                          <td>{flight.economySeats.price}</td>
                          <td>{flight.businessSeats.price}</td>

                          <td>{flight.aircraft}</td>
                          <td>{flight.manufacturer}</td>
                          <td>{flight.status}</td>
                          <td>{flight.economySeats.total}</td>
                          <td>{flight.economySeats.available}</td>
                          <td>{flight.businessSeats.total}</td>
                          <td>{flight.businessSeats.available}</td>
                          <td className="action-buttons">
                            <button
                              onClick={() => handleEdit(flight)}
                              className="edit-button"
                            >
                              Sửa
                            </button>
                            <button
                              onClick={() => handleDelete(flight.id)}
                              className="delete-button"
                            >
                              Xóa
                            </button>
                            <button
                              onClick={() => handleDelay(flight.id)}
                              className="delay-button"
                            >
                              Delay
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "post-information" && <AdminInfo />}
          {activeTab === "plane-data" && <AdminPlane />}
          {activeTab === "statistics" && <AdminInfo />}
          {activeTab === "change-time" && <AdminInfo />}
          {activeTab === "booking-stats" && <BookingStats flights={flights} />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
