//backend/src/models/bookingModel.js
class Booking {
  constructor(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.flightId = data.flightId;
    this.passengerName = data.passengerName;
    this.passengerEmail = data.passengerEmail;
    this.bookingDate = data.bookingDate;
    this.status = data.status;
  }
}

export default Booking;
