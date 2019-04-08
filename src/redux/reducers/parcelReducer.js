// import {
//   ADD_PARCEL,
//   GET_PARCELS,
//   DELETE_PARCEL,
//   PARCEL_LOADING,
//   ADD_PARCEL_FAIL
// } from '../actions/types';

// const initialState = {
//   parcels: [],
//   parcel: {},
//   isLoading: false,
//   error: ''
// };
// export default (state = initialState, action) => {
//   switch (action.type) {
//     case PARCEL_LOADING:
//       return {
//         ...state,
//         isLoading: true
//       };
//     case GET_PARCELS:
//       return {
//         ...state,
//         isLoading: false,
//         parcels: action.payload,
//       };
//     case GET_PARCEL:
//       return {
//         ...state,
//         isLoading: false,
//         parcel: action.payload,
//       };
//     default:
//       return state;
//   }
// }