import { sendHttpRequest } from '../../services/utils';

import { 
  PARCEL_LOADING,
  ADD_PARCEL,
  ADD_PARCEL_FAIL,
  GET_ERRORS
} from './types';

export const createParcel = parcelData => async (dispatch) => {
  dispatch({ type: PARCEL_LOADING});
  try {
    console.log(parcelData);
    const response = await sendHttpRequest('/parcels', 'POST', parcelData);
    return dispatch({ type: ADD_PARCEL, payload: response.parcel})
  } catch (error) {
    console.log(error.response)
    switch (error.response.status) {
      case 400:
      case 404:
      case 401:
      console.log(error.response.data.message)
        return dispatch({ type: ADD_PARCEL_FAIL, payload: error.response.data.message });
      default:
        return dispatch({ type: ADD_PARCEL_FAIL, payload: `Network error. Please try again later` });
    }
  }
}
