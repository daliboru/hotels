const Reservation = require('../../models/Reservation');
const { validateReservationInput } = require('../../utils/validators');
const { UserInputError } = require('apollo-server');

module.exports = {
  Query: {
    async getReservation(_, { reservationId }) {
      try {
        const reservation = await Reservation.findById(reservationId);
        if (reservation) {
          return reservation;
        } else {
          throw new Error('Reservation not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createReservation(
      _,
      {
        reservationInput: {
          first_name,
          last_name,
          phone,
          email,
          hotel_id,
          arrival_date,
          departure_date,
          num_of_rooms,
        },
      }
    ) {
      const { valid, errors } = validateReservationInput(
        first_name,
        last_name,
        phone,
        hotel_id,
        email,
        arrival_date,
        departure_date,
        num_of_rooms
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const newReservation = new Reservation({
        first_name,
        last_name,
        phone,
        hotel: hotel_id,
        email,
        arrival_date,
        departure_date,
        num_of_rooms,
      });

      const reservation = await newReservation.save();
      return reservation;
    },
  },
};
