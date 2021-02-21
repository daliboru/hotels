const Hotel = require('../../models/Hotel');
const Reservation = require('../../models/Reservation');

const getTestDates = (arrDate, depDate) => {
  const difference = Math.abs(new Date(arrDate) - new Date(depDate));
  const days = difference / (1000 * 3600 * 24);
  const testDates = [];
  for (let i = 0; i <= days; i++) {
    testDates.push(addDays(new Date(arrDate), i));
  }
  return testDates;
};

const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const checkReservationsForRooms = (arr, dep, numOfRooms) => {
  let x = [];
  // issue when hotel has multiple reservations... on one could work on other couldn't
  if (arr.length) {
    for (let i = 0; i < arr.length; i++) {
      // console.log('hotel: ' + arr[i].hotel.city);
      // console.log('want to book: ' + numOfRooms);
      // console.log('already booked: ' + arr[i].num_of_rooms);
      // console.log('hotel: ' + arr[i].hotel.num_of_rooms);
      if (numOfRooms + arr[i].num_of_rooms > arr[i].hotel.num_of_rooms) {
        x.push(arr[i].hotel);
      }
    }
  }
  if (dep.length) {
    for (let i = 0; i < dep.length; i++) {
      // console.log('hotel: ' + dep[i].hotel.city);
      // console.log('want to book: ' + numOfRooms);
      // console.log('already booked: ' + dep[i].num_of_rooms);
      // console.log('hotel: ' + dep[i].hotel.num_of_rooms);
      if (numOfRooms + dep[i].num_of_rooms > dep[i].hotel.num_of_rooms) {
        x.push(dep[i].hotel);
      }
    }
  }
  return x;
};

module.exports = {
  Query: {
    async getHotels(_, { filter }) {
      try {
        if (filter && Object.keys(filter).length === 4) {
          const { arrDate, depDate, numOfRooms, price } = filter;
          //we want to check these days for the room availability
          const testDates = getTestDates(arrDate, depDate);

          const filterHotelsArrival = [];
          for (let i = 0; i < testDates.length; i++) {
            let x = await Reservation.find({ arrival_date: testDates[i] });
            if (x.length) {
              x.forEach((el) => {
                filterHotelsArrival.push(el);
              });
            }
          }
          const filterHotelsDeparture = [];
          for (let i = 0; i < testDates.length; i++) {
            let x = await Reservation.find({ departure_date: testDates[i] });
            if (x.length) {
              x.forEach((el) => {
                filterHotelsDeparture.push(el);
              });
            }
          }

          const unwantedHotels = checkReservationsForRooms(
            filterHotelsArrival,
            filterHotelsDeparture,
            numOfRooms
          );

          const hotels = await Hotel.find()
            .where('num_of_rooms')
            .gte(numOfRooms)
            .where('price')
            .lte(price)
            .sort({
              price: 'asc',
            });

          if (hotels.length) {
            if (unwantedHotels.length) {
              for (let i = 0; i < unwantedHotels.length; i++) {
                const hotelNames = hotels.map((hotel) => hotel.city);
                let unwantedHotel = unwantedHotels[i];
                //find index of unwantedHotel name in hotels
                let place = hotelNames.indexOf(unwantedHotel.city);
                if (place >= 0) {
                  hotels.splice(place, 1);
                }
              }
            }
            return hotels;
          } else {
            return [];
          }

          // const x = [];
        } else if (filter && Object.keys(filter).length === 3) {
          // remove where('price') from hotels
          const { arrDate, depDate, numOfRooms } = filter;
          //we want to check these days for the room availability
          const testDates = getTestDates(arrDate, depDate);

          const filterHotelsArrival = [];
          for (let i = 0; i < testDates.length; i++) {
            let x = await Reservation.find({ arrival_date: testDates[i] });
            if (x.length) {
              x.forEach((el) => {
                filterHotelsArrival.push(el);
              });
            }
          }
          const filterHotelsDeparture = [];
          for (let i = 0; i < testDates.length; i++) {
            let x = await Reservation.find({ departure_date: testDates[i] });
            if (x.length) {
              x.forEach((el) => {
                filterHotelsDeparture.push(el);
              });
            }
          }

          const unwantedHotels = checkReservationsForRooms(
            filterHotelsArrival,
            filterHotelsDeparture,
            numOfRooms
          );

          const hotels = await Hotel.find()
            .where('num_of_rooms')
            .gte(numOfRooms)
            .sort({
              price: 'asc',
            });

          if (hotels.length) {
            if (unwantedHotels.length) {
              for (let i = 0; i < unwantedHotels.length; i++) {
                const hotelNames = hotels.map((hotel) => hotel.city);
                let unwantedHotel = unwantedHotels[i];
                //find index of unwantedHotel name in hotels
                let place = hotelNames.indexOf(unwantedHotel.city);
                if (place >= 0) {
                  hotels.splice(place, 1);
                }
              }
            }
            return hotels;
          } else {
            return [];
          }
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async everyThing() {
      try {
        const hotels = await Hotel.find().sort({
          price: 'asc',
        });
        const hotelIds = hotels.map((hotel) => {
          return hotel.id;
        });
        const hotelsWithReservationsArray = hotelIds.map(async (hotelId) => {
          const hotel = await Hotel.findById(hotelId);
          const reservation = await Reservation.where('hotel')
            .equals(hotelId)
            .sort({ arrival_date: 'asc' })
            .exec();
          if (reservation && hotel) {
            return { hotel, reservation };
          } else {
            throw new Error('Hotel not found');
          }
        });

        return hotelsWithReservationsArray;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
