import { toast } from 'react-toastify';
import { sendHttpRequest } from '../../services/utils';
import { 
  ADD_PARCEL,
  ADD_PARCEL_FAIL,
  CHANGE_PARCEL_DESTINATION_SUCCESS,
  DELETE_PARCEL,
  GET_PARCEL_FAILURE,
  GET_PARCEL_SUCCESS,
  GET_USER_PARCELS_FAILURE,
  GET_USER_PARCELS_REQUEST,
  GET_USER_PARCELS_SUCCESS,
  PARCEL_LOADING,
} from './types';

export const createParcel = parcelData => async (dispatch) => {
  dispatch({ type: PARCEL_LOADING});
  try {
    const response = await sendHttpRequest('/parcels', 'POST', parcelData);
    return dispatch({ type: ADD_PARCEL, payload: response.parcel})
  } catch ({ response }) {
    return dispatch({ type: ADD_PARCEL_FAIL, payload: response.data.message });
  }
};

export const getUserParcels = (id) => async (dispatch) => {
  dispatch({ type: PARCEL_LOADING});
  try {
    const response = id ? 
    await sendHttpRequest(`/users/${id}/parcels`, 'GET') : await sendHttpRequest('/users/parcels', 'GET');
    return dispatch({ type: GET_USER_PARCELS_SUCCESS, payload: response.parcels})
  } catch ({ response }) {
    return dispatch({ type: GET_USER_PARCELS_FAILURE, payload: response.data.message });
  }
};

export const getParcel = (order_number) => async (dispatch) => {
  dispatch({ type: PARCEL_LOADING});
  try {
    const response = await sendHttpRequest(`/parcels/${order_number}`, 'GET');
    return dispatch({ type: GET_PARCEL_SUCCESS, payload: response.parcel})
  } catch ({ response }) {
    return dispatch({ type: GET_PARCEL_FAILURE, payload: response.data.message });
  }
};

export const editDestination = (id, parcelData, closeModal) => async (dispatch) => {
  dispatch({ type: PARCEL_LOADING});
  try {
    const response = await sendHttpRequest(`/parcels/${id}/destination`, 'PATCH', parcelData);
    dispatch({ type: CHANGE_PARCEL_DESTINATION_SUCCESS, payload: response.parcel });
    toast.success('Destination updated successfully');
    return closeModal();
    
  } catch (error) {
    switch (error.response.status) {
      case 400:
      case 404:
      case 401:
        return toast.error(error.response.data.message);
      default:
        return toast.error(`Error changing destination!`);
    }
  }
};

export const cancelParcel= (id, closeModal) => async (dispatch) => {
  dispatch({ type: PARCEL_LOADING});
  try {
    const response = await sendHttpRequest(`/parcels/${id}`, 'PATCH');
    dispatch({ type: DELETE_PARCEL, payload: response.parcel });
    toast.success('Order cancelled successfully');
    return closeModal();
    
  } catch (error) {
    switch (error.response.status) {
      case 400:
      case 404:
      case 401:
        return toast.error(error.response.data.message);
      default:
        return toast.error(`Cannot cancel this order at the moment.
          Please try again later`);
    }
  }
};
