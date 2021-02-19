const Hotel = require('../../models/Hotel');
const Reservation = require('../../models/Reservation');

const getTarget = async (hotelIds, arrDate, depDate) => {
  const x = hotelIds.map(async (hotelId) => {
    //array of reservations
    const gimmeBackRes = await Reservation.find()
      .where('hotel')
      .equals(hotelId)
      .where('arrival_date')
      .gte(new Date(arrDate))
      .where('departure_date')
      .lte(new Date(depDate))
      .sort({ arrival_date: 'asc' })
      .exec();

    if (gimmeBackRes.length) {
      const result = {
        hotelId: gimmeBackRes[0].hotel._id,
        reservationId: gimmeBackRes.map((res) => res.id),
      };
      return result;
    } else {
      return 0;
    }
  });
  return Promise.all(x);
};

const getUnwantedIds = async (targetHotelsWithReservations, numOfRooms) => {
  const x = targetHotelsWithReservations.map(async (res) => {
    let hotel = await Hotel.findById(res.hotelId);
    if (hotel) {
      const unwantedIds = res.reservationId.map(async (resId) => {
        const reservation = await Reservation.findById(resId);
        if (reservation.num_of_rooms + numOfRooms > hotel.num_of_rooms) {
          return hotel.id;
        } else {
          return 0;
        }
      });
      return Promise.all(unwantedIds);
    }
  });
  return Promise.all(x);
};

const cleanUnWantedHotelIds = (unwantedHotelIds) => {
  const x = unwantedHotelIds.filter((el) => Array.isArray(el));
  return clean(x);
};

const clean = (cleanUnWantedHotelIds) => {
  return cleanUnWantedHotelIds.map((item) => {
    return item.filter((el) => el !== 0);
  });
};

module.exports = {
  Query: {
    async getHotels(_, { filter }) {
      try {
        if (filter && Object.keys(filter).length === 4) {
          const { arrDate, depDate, numOfRooms, price } = filter;
          // ⚠️ arrDate, depDate = string

          // gimme all hotels
          const hotels = await Hotel.find().sort({
            price: 'asc',
          });
          // now gimme all of hotels ids
          const hotelIds = hotels.map((hotel) => {
            return hotel.id;
          });

          // get ids of hotels and their reservations that are in collision with the requested dates
          const targetHotelsWithReservations = await getTarget(
            hotelIds,
            arrDate,
            depDate,
            numOfRooms,
            price
          );
          // console.log(targetHotelsWithReservations);
          const unwantedHotelIdsWithStuff = await getUnwantedIds(
            targetHotelsWithReservations,
            numOfRooms
          );

          const unwantedHotelIds = cleanUnWantedHotelIds(
            unwantedHotelIdsWithStuff
          );

          const filteredHotels = await Hotel.find()
            .where('num_of_rooms')
            .gte(numOfRooms)
            .where('price')
            .lte(price)
            .sort({
              price: 'asc',
            });

          const ids = [];
          for (let i = 0; i < unwantedHotelIds.length; i++) {
            const id = unwantedHotelIds[i];
            for (let j = 0; j < filteredHotels.length; j++) {
              const hotel = filteredHotels[j];
              // console.log(`hotel id: ${hotel._id}| ${id}`);
              if (hotel._id == id[0]) {
                ids.push(hotel.id);
              }
            }
          }

          if (!ids.length) {
            return filteredHotels;
          } else {
            // console.log(ids);
            // console.log(filteredHotels);
            const q = [];
            filteredHotels.forEach((hotel, i) => {
              ids.forEach((id) => {
                if (hotel.id == id) {
                  q.push(i);
                }
              });
            });
            q.reverse().forEach((index) => {
              filteredHotels.splice(index, 1);
            });
            return filteredHotels;
          }
          // 🔚 we want to get the ids of hotels that should not be displayed
        } else if (filter && Object.keys(filter).length === 3) {
          const { arrDate, depDate, numOfRooms } = filter;
          // gimme all hotels
          const hotels = await Hotel.find().sort({
            price: 'asc',
          });
          // now gimme all of hotels ids
          const hotelIds = hotels.map((hotel) => {
            return hotel.id;
          });

          // get ids of hotels and their reservations that are in collision with the requested dates
          const targetHotelsWithReservations = await getTarget(
            hotelIds,
            arrDate,
            depDate,
            numOfRooms
          );
          // console.log(targetHotelsWithReservations);
          const unwantedHotelIdsWithStuff = await getUnwantedIds(
            targetHotelsWithReservations,
            numOfRooms
          );

          const unwantedHotelIds = cleanUnWantedHotelIds(
            unwantedHotelIdsWithStuff
          );

          const filteredHotels = await Hotel.find()
            .where('num_of_rooms')
            .gte(numOfRooms)
            .sort({
              price: 'asc',
            });

          const ids = [];
          for (let i = 0; i < unwantedHotelIds.length; i++) {
            const id = unwantedHotelIds[i];
            for (let j = 0; j < filteredHotels.length; j++) {
              const hotel = filteredHotels[j];
              // console.log(`hotel id: ${hotel._id}| ${id}`);
              if (hotel._id == id[0]) {
                ids.push(hotel.id);
              }
            }
          }

          if (!ids.length) {
            return filteredHotels;
          } else {
            // console.log(ids);
            // console.log(filteredHotels);
            const q = [];
            filteredHotels.forEach((hotel, i) => {
              ids.forEach((id) => {
                if (hotel.id == id) {
                  q.push(i);
                }
              });
            });
            q.reverse().forEach((index) => {
              filteredHotels.splice(index, 1);
            });
            return filteredHotels;
          }
        } else {
          return await Hotel.find().sort({
            price: 'asc',
          });
        }
      } catch (error) {
        throw new Error(error);
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
