const { model, Schema } = require('mongoose');

const reservationSchema = new Schema({
  first_name: String,
  last_name: String,
  phone: String,
  email: String,
  arrival_date: Date,
  departure_date: Date,
  num_of_rooms: Number,
  hotel: {
    type: Schema.Types.ObjectId,
    ref: 'Hotel',
    autopopulate: true,
  },
});

reservationSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('Reservation', reservationSchema);
