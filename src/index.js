const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const BookingAPI = require('./datasources/booking');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    bookingAPI: new BookingAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});