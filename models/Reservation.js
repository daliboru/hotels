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

reservationSchema.pre('save', (next) => {
  this.arrival_date = new Date(this.arrival_date).setHours(0, 0, 0, 0);
  this.departure_date = new Date(this.departure_date).setHours(0, 0, 0, 0);
  next();
});

reservationSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('Reservation', reservationSchema);
