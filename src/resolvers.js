module.exports = {
  Query: {
    bookings: (_, __, { dataSources }) =>
      dataSources.bookingAPI.getAllBookings(),
    booking: (_, { id }, { dataSources }) =>
      dataSources.bookingAPI.getBookingById({ bookingId: id }),
  }
}