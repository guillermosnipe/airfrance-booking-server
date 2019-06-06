const { RESTDataSource } = require('apollo-datasource-rest');
const dateFormat = require('dateformat');

class BookingAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://private-amnesiac-8e4e59-bookings9.apiary-proxy.com/';
  }

  async getAllBookings() {
    const response = await this.get('bookings');
    return Array.isArray(response)
      ? response.map(booking => this.bookingReducer(booking))
      : [];
  }

  async getBookingById({ bookingId }) {
    const response = await this.get('bookings', { bookingCode: bookingId });
    return this.bookingReducer(response[0]);
  }

  bookingReducer(booking) {
    return {
      bookingCode: booking.bookingCode,
      firstName: booking.passengers.firstName,
      lastName: booking.passengers.lastName,
      title: booking.passengers.title.name,
      originCity: booking.itinerary.connections[0].origin.city.name,
      originAirport: booking.itinerary.connections[0].origin.name,
      destinationCity: booking.itinerary.connections[0].destination.city.name,
      destinationAirport: booking.itinerary.connections[0].destination.name,
      localScheduledDeparture: dateFormat(booking.itinerary.connections[0].segments[0].marketingFlight.operatingFlight.localScheduledDeparture,"ddd., dd mmm. HH:MM"),
      localScheduledArrival: dateFormat(booking.itinerary.connections[0].segments[0].marketingFlight.operatingFlight.localScheduledArrival,"ddd., dd mmm. HH:MM")
    };
  }
}

module.exports = BookingAPI;