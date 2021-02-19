const { model, Schema } = require('mongoose');

const hotelSchema = new Schema({
  name: String,
  city: String,
  price: Number,
  num_of_rooms: Number,
});

module.exports = model('Hotel', hotelSchema);
