const gql = require('graphql-tag');

module.exports = gql`
  scalar Date
  type Hotel {
    id: ID!
    name: String!
    city: String!
    num_of_rooms: Int!
    price: Int!
  }
  type Reservation {
    id: ID!
    first_name: String!
    last_name: String!
    phone: String!
    email: String!
    arrival_date: Date!
    departure_date: Date!
    num_of_rooms: Int!
    hotel: Hotel!
  }
  type Result {
    hotelId: ID!
    reservationId: [ID]!
  }
  type Everything {
    hotel: Hotel!
    reservation: [Reservation]
  }
  input reservationInput {
    hotel_id: ID!
    first_name: String!
    last_name: String!
    phone: String!
    email: String!
    arrival_date: String!
    departure_date: String!
    num_of_rooms: Int!
  }
  input filterInput {
    arrDate: String!
    depDate: String!
    numOfRooms: Int!
    price: Int
  }

  type Query {
    # final 👇
    getHotels(filter: filterInput): [Hotel]
    getReservation(reservationId: String!): Reservation!
    everyThing: [Everything]
  }
  type Mutation {
    createReservation(reservationInput: reservationInput): Reservation!
  }
`;
