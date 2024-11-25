// backend/src/models/flightModel.js
class Flight {
  constructor(data) {
    this.id = data.id;
    this.flightNumber = data.flightNumber;
    this.from = data.from;
    this.to = data.to;
    this.departureTime = data.departureTime;
    this.arrivalTime = data.arrivalTime;
    this.price = data.price;
    this.availableSeats = data.availableSeats;
  }
}

export default Flight;
