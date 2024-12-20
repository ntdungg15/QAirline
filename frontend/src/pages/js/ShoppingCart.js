import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/shoppingCart.css";
import axios from "axios";
import { authService } from "../../services/auth";
import { userService } from "../../services/userService";

const ShoppingCart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingDetails } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null);

  if (!bookingDetails) {
    return (
      <div className="no-booking">
        <h2>Không tìm thấy thông tin đặt vé</h2>
        <button onClick={() => navigate("/")}>Quay lại trang chủ</button>
      </div>
    );
  }

  const { flight, seatClass, price, availableSeats } = bookingDetails;

  const handleBooking = async () => {
    try {
      setLoading(true);

      // Kiểm tra số ghế trống
      if (bookingDetails.availableSeats <= 0) {
        setBookingStatus({
          success: false,
          message: "Đã hết ghế cho hạng vé này",
        });
        return;
      }

      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        setBookingStatus({
          success: false,
          message: "Vui lòng đăng nhập để đặt vé",
        });
        navigate("/login", { state: { from: location } });
        return;
      }

      console.log("User ID:", currentUser.uid); // Debug log

      const userData = await userService.getUserById(currentUser.uid);
      if (!userData) {
        throw new Error("Không tìm thấy thông tin người dùng");
      }

      // Sử dụng dữ liệu từ bookingDetails
      const bookingData = {
        flightId: bookingDetails.flightId,
        passengerName: userData.name,
        passengerEmail: currentUser.email,
        seatClass: bookingDetails.seatClass,
        bookingDate: bookingDetails.bookingDate,
        status: bookingDetails.status,
        // Thêm thông tin chuyến bay
        flightNumber: bookingDetails.flight.flightNumber,
        departureTime: bookingDetails.flight.departureTime,
        arrivalTime: bookingDetails.flight.arrivalTime,
        from: bookingDetails.flight.from,
        to: bookingDetails.flight.to,
      };

      // Validate dữ liệu
      if (
        !bookingData.flightId ||
        !bookingData.passengerName ||
        !bookingData.passengerEmail ||
        !bookingData.seatClass
      ) {
        throw new Error("Thiếu thông tin đặt vé");
      }

      const response = await axios.post(
        `http://localhost:3000/api/bookings`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${await currentUser.getIdToken()}`,
            "Content-Type": "application/json",
          },
        }
      );

      setBookingStatus({
        success: true,
        message:
          "Đặt vé thành công! Bạn có thể xem chi tiết trong lịch sử đặt vé.",
      });

      setTimeout(() => {
        navigate("/bookings", {
          state: { bookingId: response.data.id },
        });
      }, 2000);
    } catch (error) {
      console.error("Booking error:", error);
      let errorMessage = "Có lỗi xảy ra khi đặt vé. Vui lòng thử lại sau.";

      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage =
              error.response.data.error || "Thông tin đặt vé không hợp lệ";
            break;
          case 401:
            errorMessage = "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại";
            navigate("/login", { state: { from: location } });
            break;
          case 404:
            errorMessage = "Không tìm thấy chuyến bay";
            break;
          default:
            errorMessage = "Có lỗi xảy ra khi đặt vé. Vui lòng thử lại sau.";
        }
      }

      setBookingStatus({
        success: false,
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shopping-cart-container">
      <h1>Chi tiết đặt vé</h1>

      {bookingStatus && (
        <div
          className={`booking-status ${
            bookingStatus.success ? "success" : "error"
          }`}
        >
          {bookingStatus.message}
        </div>
      )}

      <div className="booking-summary">
        <div className="flight-details">
          <h2>Thông tin chuyến bay</h2>

          <div className="route-info">
            <div className="departure-info">
              <h3>Điểm khởi hành</h3>
              <p className="city">{flight.from}</p>
              <p className="time">{flight.departureTime}</p>
              <p className="airport">Sân bay {flight.from}</p>
            </div>

            <div className="flight-direction">
              <div className="arrow-line"></div>
              <p>Bay thẳng</p>
            </div>

            <div className="arrival-info">
              <h3>Điểm đến</h3>
              <p className="city">{flight.to}</p>
              <p className="time">{flight.arrivalTime}</p>
              <p className="airport">Sân bay {flight.to}</p>
            </div>
          </div>

          <div className="ticket-details">
            <div className="detail-item">
              <span className="label">Mã chuyến bay:</span>
              <span className="value">{flight.flightNumber}</span>
            </div>
            <div className="detail-item">
              <span className="label">Hạng vé:</span>
              <span className="value">
                {seatClass === "economy" ? "Economy Class" : "Business Class"}
              </span>
            </div>
            <div className="detail-item">
              <span className="label">Số ghế trống:</span>
              <span className="value">{availableSeats}</span>
            </div>

            <div className="detail-item">
              <span className="label">Giá vé:</span>
              <span className="value price">{price.toLocaleString()} VND</span>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button
            className="continue-booking"
            onClick={handleBooking}
            disabled={loading || bookingStatus?.success}
          >
            {loading ? "Đang xử lý..." : "Đặt vé"}
          </button>
          <button className="back-button" onClick={() => navigate(-1)}>
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
