import {
  ADD_PARCEL,
  ADD_PARCEL_FAIL,
  CHANGE_PARCEL_DESTINATION_SUCCESS,
  DELETE_PARCEL,
  GET_PARCEL_FAILURE,
  GET_PARCEL_SUCCESS,
  GET_USER_PARCELS_FAILURE,
  GET_USER_PARCELS_SUCCESS,
  PARCEL_LOADING
  
} from '../actions/types';

const initialState = {
  parcels: [],
  parcel: {},
  isLoading: false,
  error: ''
};
export default (state = initialState, action) => {
  switch (action.type) {
    case PARCEL_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_PARCEL:
      return {
        ...state,
        isLoading: false,
        parcels: [action.payload, ...state.parcels]
      };
      case ADD_PARCEL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: [action.payload, ...state.parcels]
      };
    case GET_USER_PARCELS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        parcels: action.payload,
      };
    case GET_USER_PARCELS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_PARCEL_SUCCESS:
      return {
        ...state,
        parcel: action.payload,
        isLoading: false
      }
    case GET_PARCEL_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
      case CHANGE_PARCEL_DESTINATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        parcels: state.parcels.map(parcel => (parcel.order_number === action.payload.order_number ? action.payload : parcel))
      };
      case DELETE_PARCEL:
      return {
        ...state,
        isLoading: false,
        parcels: state.parcels.map(parcel => (parcel.order_number === action.payload.order_number ? action.payload : parcel))
      };
    default:
      return state;
  }
}