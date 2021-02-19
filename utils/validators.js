module.exports.validateReservationInput = (
  first_name,
  last_name,
  phone,
  hotel_id,
  email,
  arrival_date,
  departure_date,
  num_of_rooms
) => {
  const errors = {};
  if (hotel_id.trim() === '') {
    errors.hotel_id = 'Hotel ID must not be empty';
  }
  if (first_name.trim() === '') {
    errors.first_name = 'First name must not be empty';
  }
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }
  if (last_name.trim() === '') {
    errors.last_name = 'Last name must not be empty';
  }
  if (phone.trim() === '') {
    errors.phone = 'Phone must not be empty';
  }
  if (arrival_date.trim() === '') {
    errors.arrival_date = 'Arrival date must not be empty';
  }
  if (departure_date.trim() === '') {
    errors.departure_date = 'Departure date must not be empty';
  }
  if (num_of_rooms === undefined) {
    errors.num_of_rooms = 'Number of rooms must not be empty';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
