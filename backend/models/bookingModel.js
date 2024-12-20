//backend/src/models/bookingModel.js
// class Booking {
//   constructor(data) {
//     this.id = data.id;
//     this.userId = data.userId;
//     this.flightId = data.flightId;
//     this.passengerName = data.passengerName;
//     this.passengerEmail = data.passengerEmail;
//     this.bookingDate = data.bookingDate;
//     this.status = data.status;
//   }
// }

// export default Booking;

class Booking {
  constructor(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.flightId = data.flightId;
    this.passengerName = data.passengerName;
    this.passengerEmail = data.passengerEmail;
    this.bookingDate = data.bookingDate;
    this.status = data.status || "Active"; // Trạng thái đặt vé (Active, Cancelled)
    this.seatNumber = data.seatNumber; // Số ghế
    this.cancellationDeadline = data.cancellationDeadline; // Hạn cuối hủy vé
    this.seatClass = data.seatClass || "economy"; // economy hoặc business
    this.seatPrice = data.seatPrice || 0; // Giá của ghế
  }
}
export default Booking;
