import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const Reservation = (
  {
    valueData: { arrDate, depDate, numOfRooms, price },
    activate,
    hotelId,
    booking,
    setActivate,
  },
  props
) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    hotel_id: '',
    arrival_date: '',
    departure_date: '',
    num_of_rooms: '',
  });

  const [reserve] = useMutation(CREATE_RESERVATION, {
    update(_, result) {
      console.log(result);
      setErrors({});
      setActivate(false);
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    reserve();
  };

  return (
    <>
      {activate && (
        <div className='reservation'>
          <div className='reservation-head'>
            <h3 style={{ paddingBottom: '0px' }}>
              <strong>Book it</strong>{' '}
            </h3>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              onClick={booking}
              style={{ cursor: 'pointer', width: '3rem' }}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </div>
          <form className='reservation-form' onSubmit={onSubmit}>
            <div className='reservation-form-item'>
              Name:{' '}
              <input
                type='text'
                name='first_name'
                value={values.first_name}
                onChange={onChange}
              />
            </div>
            <div className='reservation-form-item'>
              Surname:{' '}
              <input
                type='text'
                name='last_name'
                value={values.last_name}
                onChange={onChange}
              />
            </div>
            <div className='reservation-form-item'>
              Email:{' '}
              <input
                type='email'
                name='email'
                value={values.email}
                onChange={onChange}
              />
            </div>
            <div
              className='reservation-form-item'
              style={{ visibility: 'hidden', display: 'none' }}
            >
              <input
                type='text'
                name='hotel_id'
                value={(values.hotel_id = hotelId)}
                onChange={onChange}
                disabled
              />
            </div>
            <div className='reservation-form-item'>
              Arrival date:{' '}
              <input
                type='date'
                name='arrival_date'
                onChange={onChange}
                value={
                  (values.arrival_date = new Date(arrDate)
                    .toISOString()
                    .substr(0, 10))
                }
                disabled
              />
            </div>
            <div className='reservation-form-item'>
              Departure date:{' '}
              <input
                type='date'
                name='departure_date'
                placeholder='2021/03/03'
                onChange={onChange}
                value={
                  (values.departure_date = new Date(depDate)
                    .toISOString()
                    .substr(0, 10))
                }
                disabled
              />
            </div>
            <div className='reservation-form-item'>
              Phone number:{' '}
              <input
                type='text'
                name='phone'
                value={values.phone}
                onChange={onChange}
              />
            </div>
            <div className='reservation-form-item'>
              Number of rooms:{' '}
              <input
                type='number'
                name='num_of_rooms'
                placeholder={numOfRooms}
                value={(values.num_of_rooms = numOfRooms)}
                onChange={onChange}
                disabled
              />
            </div>
            <button className='reservation-form-item' type='submit'>
              Submit
            </button>
          </form>
          {Object.keys(errors).length > 0 && (
            <div className='error'>
              <ul className='list'>
                {Object.values(errors).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const CREATE_RESERVATION = gql`
  mutation createReservation(
    $first_name: String!
    $last_name: String!
    $phone: String!
    $hotel_id: ID!
    $email: String!
    $arrival_date: String!
    $departure_date: String!
    $num_of_rooms: Int!
  ) {
    createReservation(
      reservationInput: {
        first_name: $first_name
        last_name: $last_name
        phone: $phone
        hotel_id: $hotel_id
        email: $email
        arrival_date: $arrival_date
        departure_date: $departure_date
        num_of_rooms: $num_of_rooms
      }
    ) {
      first_name
      last_name
      phone
      email
      arrival_date
      departure_date
      num_of_rooms
    }
  }
`;

export default Reservation;
