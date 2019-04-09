import { toast } from 'react-toastify';
import {
  CHANGE_LOCATION,
  DELIVER_PARCEL,
  PARCEL_LOADING,
  GET_ALL_PARCELS,
} from '../actions/types';

const initialState = {
  parcels: [],
  isLoading: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case PARCEL_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_ALL_PARCELS:
      return {
        ...state,
        isLoading: false,
        parcels: action.payload,
      };
      case CHANGE_LOCATION:
      return {
        ...state,
        isLoading: false,
        parcels: state.parcels.map(parcel => (parcel.order_number === action.payload.order_number ? action.payload : parcel))
      };
      case DELIVER_PARCEL:
      return {
        ...state,
        isLoading: false,
        parcels: state.parcels.map(parcel => (parcel.order_number === action.payload.order_number ? action.payload : parcel))
      };
    default:
      return state;
  }
}