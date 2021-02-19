const hotelResolvers = require('./hotel');
const reservationResolvers = require('./reservation');

module.exports = {
  Query: {
    ...hotelResolvers.Query,
    ...reservationResolvers.Query,
  },
  Mutation: {
    ...reservationResolvers.Mutation,
  },
};
