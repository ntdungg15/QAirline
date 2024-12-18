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
    this.from = data.from;
    this.to = data.to;
    this.departureTime = data.departureTime;
    this.arrivalTime = data.arrivalTime;
    this.price = data.price;
    this.availableSeats = data.availableSeats;
    this.aircraft = data.aircraft; // Thêm thông tin về tàu bay
    this.manufacturer = data.manufacturer; // Hãng sản xuất
    this.status = data.status || "On Time"; // Trạng thái chuyến bay (phục vụ chức năng delay)
    this.economySeats = {
      total: data.economySeats?.total || 0,
      available: data.economySeats?.available || 0,
      price: data.economySeats?.price || 0,
    };

    this.businessSeats = {
      total: data.businessSeats?.total || 0,
      available: data.businessSeats?.available || 0,
      price: data.businessSeats?.price || 0,
    };
  }
}
export default Flight;
