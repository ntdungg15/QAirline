import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/inforuser.css";

const InforUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [bookingError, setBookingError] = useState(null);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [editFormData, setEditFormData] = useState({
    username: "",
    email: "",
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("info");

  useEffect(() => {
    fetchUserProfile();
    if (selectedSection === "history") {
      fetchBookings();
    }
  }, [navigate, selectedSection]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        throw new Error("Vui lòng đăng nhập để xem thông tin");
      }

      const response = await axios.get(
        `http://localhost:3000/api/users/inforUser`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
      setEditFormData({
        username: response.data.username,
        email: response.data.email,
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(response.data);
    } catch (error) {
      setBookingError(
        error.response?.data?.error || "Không thể tải lịch sử đặt chỗ"
      );
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/bookings/${bookingId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCancelSuccess(true);
      setTimeout(() => setCancelSuccess(false), 3000);
      fetchBookings(); // Refresh booking list
    } catch (error) {
      setBookingError(error.response?.data?.error || "Không thể hủy đặt chỗ");
    }
  };

  const canCancelBooking = (cancellationDeadline) => {
    return new Date(cancellationDeadline) > new Date();
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setUpdateSuccess(false);
    setError(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditFormData({
      username: user.username,
      email: user.email,
    });
    setError(null);
  };

  const handleInputChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3000/api/users/update-profile",
        editFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.user);
      setIsEditing(false);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (error) {
      setError(
        error.response?.data?.error || "Có lỗi xảy ra khi cập nhật thông tin"
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleMenuClick = (section) => {
    setSelectedSection(section);
  };

  return (
    <div className="infoUser-container">
      <div className="dashboard-container">
        {/* Sidebar Menu */}
        <div className="dashboard-sidebar">
          <ul className="sidebar-menu">
            <li
              className={selectedSection === "info" ? "active" : ""}
              onClick={() => handleMenuClick("info")}
            >
              Thông Tin Tài Khoản
            </li>
            <li
              className={selectedSection === "settings" ? "active" : ""}
              onClick={() => handleMenuClick("settings")}
            >
              Cài Đặt
            </li>
            <li
              className={selectedSection === "history" ? "active" : ""}
              onClick={() => handleMenuClick("history")}
            >
              Lịch Sử Đặt Chỗ
            </li>
            <li
              className={selectedSection === "support" ? "active" : ""}
              onClick={() => handleMenuClick("support")}
            >
              Hỗ Trợ
            </li>
          </ul>
        </div>
        <div className="dashboard-content">
          {selectedSection === "info" && (
            <div className="infoUser-card">
              <div className="infoUser-header">
                <h1 className="infoUser-title">Thông Tin Tài Khoản</h1>
              </div>

              {updateSuccess && (
                <div className="infoUser-alert infoUser-alert-success">
                  Cập nhật thông tin thành công!
                </div>
              )}

              {error && (
                <div className="infoUser-alert infoUser-alert-error">
                  {error}
                </div>
              )}

              <div className="infoUser-content">
                <div className="infoUser-field">
                  <p className="infoUser-label">ID Người Dùng</p>
                  <p className="infoUser-value">{user.id}</p>
                </div>

                <div className="infoUser-field">
                  <p className="infoUser-label">Tên Người Dùng</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={editFormData.username}
                      onChange={handleInputChange}
                      className="infoUser-input"
                      required
                    />
                  ) : (
                    <p className="infoUser-value">{user.username}</p>
                  )}
                </div>

                <div className="infoUser-field">
                  <p className="infoUser-label">Email</p>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleInputChange}
                      className="infoUser-input"
                      required
                    />
                  ) : (
                    <p className="infoUser-value">{user.email}</p>
                  )}
                </div>

                <div className="infoUser-field">
                  <p className="infoUser-label">Vai Trò</p>
                  <p className="infoUser-value capitalize">{user.role}</p>
                </div>

                <div className="infoUser-field">
                  <p className="infoUser-label">Số Lượng Đặt Chỗ</p>
                  <p className="infoUser-value">
                    {user?.bookings?.length || 0}
                  </p>
                </div>
              </div>

              <div className="infoUser-footer">
                {isEditing ? (
                  <div className="infoUser-button-group">
                    <button
                      onClick={handleSubmit}
                      className="infoUser-button infoUser-button-primary"
                    >
                      Lưu Thay Đổi
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="infoUser-button infoUser-button-secondary"
                    >
                      Hủy
                    </button>
                  </div>
                ) : (
                  <button onClick={handleEditClick} className="chinh-infor">
                    Chỉnh Sửa Thông Tin
                  </button>
                )}
              </div>
            </div>
          )}
          {selectedSection === "history" && (
            <div className="booking-history">
              <h2 className="text-2xl font-bold mb-4">Lịch Sử Đặt Chỗ</h2>

              {cancelSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  Hủy đặt chỗ thành công!
                </div>
              )}

              {bookingError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {bookingError}
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 border">Mã Đặt Chỗ</th>
                      <th className="p-2 border">Chuyến Bay</th>
                      <th className="p-2 border">Hạng Ghế</th>
                      <th className="p-2 border">Số Ghế</th>
                      <th className="p-2 border">Giá Vé</th>
                      <th className="p-2 border">Trạng Thái</th>
                      <th className="p-2 border">Hạn Hủy Vé</th>
                      <th className="p-2 border">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="p-2 border">{booking.id}</td>
                        <td className="p-2 border">
                          {booking.flightDetails ? (
                            <div className="space-y-1">
                              <div className="font-medium text-gray-900">
                                {booking.flightDetails.flightNumber}
                              </div>
                              <div className="text-sm text-gray-600">
                                {booking.flightDetails.from} →{" "}
                                {booking.flightDetails.to}
                              </div>
                              <div className="text-sm text-gray-500">
                                {new Date(
                                  booking.flightDetails.departureTime
                                ).toLocaleDateString("vi-VN", {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                            </div>
                          ) : (
                            <div className="text-gray-500">
                              Không có thông tin
                            </div>
                          )}
                        </td>
                        <td className="p-2 border capitalize">
                          {booking.seatClass}
                        </td>
                        <td className="p-2 border">{booking.seatNumber}</td>
                        <td className="p-2 border">
                          {booking.seatPrice?.toLocaleString()} VND
                        </td>
                        <td className="p-2 border">
                          <span
                            className={`status-badge ${
                              booking.status === "Active"
                                ? "status-active"
                                : booking.status === "Cancelled"
                                ? "status-cancelled"
                                : "status-default"
                            }`}
                          >
                            {booking.status === "Active"
                              ? "Đang hoạt động"
                              : booking.status === "Cancelled"
                              ? "Đã hủy"
                              : booking.status}
                          </span>
                        </td>
                        <td className="p-2 border">
                          {new Date(
                            booking.cancellationDeadline
                          ).toLocaleString()}
                        </td>
                        <td className="p-2 border">
                          {booking.status === "Active" &&
                          canCancelBooking(booking.cancellationDeadline) ? (
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="cancel-button"
                            >
                              Hủy Vé
                            </button>
                          ) : (
                            <span className="text-gray-500">
                              {booking.status === "Cancelled"
                                ? "Đã hủy"
                                : "Hết hạn hủy"}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InforUser;
