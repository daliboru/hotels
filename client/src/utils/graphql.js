import gql from 'graphql-tag';

export const FETCH_HOTELS_QUERY = gql`
  {
    getHotels() {
      id
      name
      city
      num_of_rooms
      price
    }
  }
`;
