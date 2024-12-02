// backend/src/models/bookingModel.js
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
    this.bookingClass = data.bookingClass;
    this.seatNumber = data.seatNumber;
    this.bookingDate = data.bookingDate;
    this.totalPrice = data.totalPrice;
    this.status = data.status;
  }
}

export default Booking;
