// BookingStats.js

import "../css/BookingStats.css";

import React, { useMemo } from "react";

const BookingStats = ({ flights }) => {
  const stats = useMemo(() => {
    const calculateStats = () => {
      const monthlyBookings = {};
      const routeBookings = {};
      const classBookings = { economy: 0, business: 0 };
      let totalRevenue = 0;
      let activeBookings = 0;
      let cancelledBookings = 0;

      flights.forEach((flight) => {
        // Calculate sold seats for each class
        const economySold =
          flight.economySeats.total - flight.economySeats.available;
        const businessSold =
          flight.businessSeats.total - flight.businessSeats.available;

        // Update class bookings
        classBookings.economy += economySold;
        classBookings.business += businessSold;

        // Calculate revenue
        totalRevenue +=
          economySold * flight.economySeats.price +
          businessSold * flight.businessSeats.price;

        // Count active and cancelled based on status
        if (flight.status === "On-time" || flight.status === "Delayed") {
          activeBookings += economySold + businessSold;
        }

        // Update monthly stats
        const date = new Date(flight.departureTime);
        const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
        monthlyBookings[monthYear] =
          (monthlyBookings[monthYear] || 0) + economySold + businessSold;

        // Update route stats
        const route = `${flight.from} - ${flight.to}`;
        routeBookings[route] =
          (routeBookings[route] || 0) + economySold + businessSold;
      });

      return {
        totalBookings: classBookings.economy + classBookings.business,
        activeBookings,
        cancelledBookings,
        totalRevenue,
        monthlyBookings,
        bookingsByRoute: routeBookings,
        bookingsByClass: classBookings,
      };
    };

    return calculateStats();
  }, [flights]);

  const recentBookings = useMemo(() => {
    return flights
      .map((flight) => {
        const economySold =
          flight.economySeats.total - flight.economySeats.available;
        const businessSold =
          flight.businessSeats.total - flight.businessSeats.available;

        return {
          id: flight.id,
          flightNumber: flight.flightNumber,
          economyBookings: economySold,
          businessBookings: businessSold,
          totalRevenue:
            economySold * flight.economySeats.price +
            businessSold * flight.businessSeats.price,
          status: flight.status,
        };
      })
      .slice(0, 10);
  }, [flights]);

  return (
    <div className="stats-container">
      <h1 className="stats-title">Thống kê đặt vé</h1>

      {/* Overview Cards */}
      <div className="stats-cards">
        <div className="stats-card">
          <div className="stats-card-title">Tổng số đặt vé</div>
          <div className="stats-card-value">{stats.totalBookings}</div>
        </div>

        <div className="stats-card active">
          <div className="stats-card-title">Đặt vé đang hoạt động</div>
          <div className="stats-card-value">{stats.activeBookings}</div>
        </div>

        <div className="stats-card cancelled">
          <div className="stats-card-title">Đặt vé đã hủy</div>
          <div className="stats-card-value">{stats.cancelledBookings}</div>
        </div>

        <div className="stats-card">
          <div className="stats-card-title">Tổng doanh thu</div>
          <div className="stats-card-value">
            {stats.totalRevenue.toLocaleString()} VND
          </div>
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="stats-detail">
        <div className="stats-detail-card">
          <h3>Thống kê theo tháng</h3>
          <ul className="detail-list">
            {Object.entries(stats.monthlyBookings).map(([month, count]) => (
              <li key={month}>
                <span>Tháng {month}</span>
                <span>{count} đặt vé</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="stats-detail-card">
          <h3>Thống kê theo tuyến đường</h3>
          <ul className="detail-list">
            {Object.entries(stats.bookingsByRoute).map(([route, count]) => (
              <li key={route}>
                <span>{route}</span>
                <span>{count} đặt vé</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="stats-detail-card">
          <h3>Thống kê theo hạng ghế</h3>
          <ul className="detail-list">
            <li>
              <span>Phổ thông</span>
              <span>{stats.bookingsByClass.economy} đặt vé</span>
            </li>
            <li>
              <span>Thương gia</span>
              <span>{stats.bookingsByClass.business} đặt vé</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="stats-table-container">
        <h3>Đặt vé gần đây</h3>
        <div style={{ overflowX: "auto" }}>
          <table className="stats-table">
            <thead>
              <tr>
                <th>Mã chuyến bay</th>
                <th>Đặt vé phổ thông</th>
                <th>Đặt vé thương gia</th>
                <th>Doanh thu</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.flightNumber}</td>
                  <td>{booking.economyBookings}</td>
                  <td>{booking.businessBookings}</td>
                  <td>{booking.totalRevenue.toLocaleString()} VND</td>
                  <td>
                    <span
                      className={`status-badge ${booking.status.toLowerCase()}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingStats;
