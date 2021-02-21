import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';

import Reservation from './Reservation';

const Hotels = ({ arrDate, depDate, numOfRooms, price, city }) => {
  const [activate, setActivate] = useState(false);
  const [hotelId, setHotelId] = useState('');

  const { loading, error, data: { getHotels: hotels } = {} } = useQuery(
    FETCH_HOTELS_QUERY,
    {
      variables: {
        arrDate,
        depDate,
        numOfRooms,
        price,
      },
    }
  );

  const onClick = (id) => {
    setHotelId(id);
  };

  const booking = () => {
    setActivate(!activate);
  };

  console.log(city);

  return (
    <>
      {loading ? (
        <div className='loading'>Loading...</div>
      ) : (
        hotels &&
        //check if hotel.city === city
        hotels.map((hotel) =>
          city !== hotel.city ? (
            ''
          ) : (
            <div
              className='card'
              key={hotel.id}
              onClick={() => onClick(hotel.id)}
            >
              <div className='card-content'>
                <content>
                  <div>
                    <strong className='strong'>Name: </strong>
                    {hotel.name}
                  </div>
                  <div>
                    <strong className='strong'>City: </strong>
                    {hotel.city}
                  </div>
                  <div>
                    <strong className='strong'>Price:</strong> {hotel.price}
                  </div>
                  <div>
                    <strong className='strong'>Number of rooms:</strong>{' '}
                    {hotel.num_of_rooms}
                  </div>
                </content>
                <button onClick={booking}>Book it</button>
              </div>
            </div>
          )
        )
      )}

      <Reservation
        valueData={{ arrDate, depDate, numOfRooms, price }}
        activate={activate}
        hotelId={hotelId}
        booking={booking}
        setActivate={setActivate}
      />
    </>
  );
};

const FETCH_HOTELS_QUERY = gql`
  query getHotels(
    $arrDate: String!
    $depDate: String!
    $numOfRooms: Int!
    $price: Int
  ) {
    getHotels(
      filter: {
        arrDate: $arrDate
        depDate: $depDate
        numOfRooms: $numOfRooms
        price: $price
      }
    ) {
      id
      name
      city
      num_of_rooms
      price
    }
  }
`;

export default Hotels;
