// backend/src/models/flightModel.js
// class Flight {
//   constructor(data) {
//     this.id = data.id;
//     this.flightNumber = data.flightNumber;
//     this.from = data.from;
//     this.to = data.to;
//     this.departureTime = data.departureTime;
//     this.arrivalTime = data.arrivalTime;
//     this.price = data.price;
//     this.availableSeats = data.availableSeats;
//   }
// }

// export default Flight;
class Flight {
  constructor(data) {
    this.id = data.id;
    this.flightNumber = data.flightNumber;
    this.from = data.departureAirport;
    this.to = data.arrivalAirport;
    this.departureTime = data.departureTime;
    this.arrivalTime = data.arrivalTime;
    this.totalSeats = data.totalSeats;
    this.availableSeats = data.availableSeats;
    this.classTypes = {
      economy: {
        price: data.classTypes.economy.price,
        availableSeats: data.classTypes.economy.availableSeats,
      },
      business: {
        price: data.classTypes.business.price,
        availableSeats: data.classTypes.business.availableSeats,
      },
    };
  }
}

export default Flight;
