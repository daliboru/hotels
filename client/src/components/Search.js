// import gql from 'graphql-tag';
// import { useState } from 'react';

// const Search = () => {
//   const [values, setValues] = useState({
//     num_of_rooms: '',
//     price: '',
//   });

//   const onChange = (event) => {
//     setValues({ ...values, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(e);
//   };

//   return (
//     <>
//       <form className='hotel-form' onSubmit={handleSubmit} noValidate>
//         <div className='hotel-form-item'>
//           Number of rooms:{' '}
//           <input
//             type='number'
//             value={values.num_of_rooms}
//             onChange={onChange}
//             name='num_of_rooms'
//           />
//         </div>
//         <div className='hotel-form-item'>
//           Max price:{' '}
//           <input
//             type='number'
//             onChange={onChange}
//             value={values.price}
//             name='price'
//           />
//         </div>
//         <button className='hotel-form-item' type='submit'>
//           Submit
//         </button>
//       </form>
//     </>
//   );
// };

// // const FILTER_HOTELS = gql`
// //   query getHotels( $and: [
// //     {
// //       $expression: {
// //         $field: String!
// //         $eq: String!
// //       }
// //     },
// //       $expression: {
// //         $field: String!
// //         $lte: String!
// //       }
// //   ]){
// //     getHotels(_filter: {
// //       and: [
// //     {
// //       expression: {
// //         field: String!
// //         eq: String!
// //       }
// //     },
// //       expression: {
// //         field: String!
// //         lte: String!
// //       }
// //   ]})
// //   }
// // `;

// export default Search;
