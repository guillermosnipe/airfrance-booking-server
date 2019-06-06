const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    bookings: [Booking]!
    booking(bookingCode: ID!): Booking
  }

  type Booking {
    bookingCode: ID!
    firstName: String
    lastName: String
    title: String
    originCity: String
    originAirport: String
    destinationCity: String
    destinationAirport: String
    localScheduledDeparture: String
    localScheduledArrival: String
  }
`;

module.exports = typeDefs;