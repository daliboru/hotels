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

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

reservationSchema.pre('save', function (doc) {
  console.log(doc);
  // const difference = Math.abs(
  //   new Date(this.departure_date) - new Date(this.arrival_date)
  // );
  // const days = difference / (1000 * 3600 * 24);
  // console.log(days);
  // const x = [];
  // for (let i = 0; i < days; i++) {
  //   x.push('ker');
  // }
  // this.dates = x;
});

reservationSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('Reservation', reservationSchema);
