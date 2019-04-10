import { sendHttpRequest } from '../../services/utils';

import { 
  CHANGE_LOCATION,
  DELIVER_PARCEL,
  PARCEL_LOADING,
  GET_ALL_PARCELS,
} from './types';
import { toast } from 'react-toastify';

export const getAllParcels =  () => async (dispatch) => {
  dispatch({ type: PARCEL_LOADING});
  try {
    const response = await sendHttpRequest('/parcels', 'GET');
    return dispatch({ type: GET_ALL_PARCELS, payload: response.parcels})
  } catch ({ response }) {
    return toast.error(response.data.message );
  }
};

export const changeLocation = (id, parcelData, closeModal) => async (dispatch) => {
  dispatch({ type: PARCEL_LOADING});
  try {
    const response = await sendHttpRequest(`/parcels/${id}/location`, 'PATCH', parcelData);
    dispatch({ type: CHANGE_LOCATION, payload: response.parcel });
    toast.success('Current location updated successfully');
    return closeModal();
    
  } catch (error) {
    switch (error.response.status) {
      case 400:
      case 404:
      case 401:
        return toast.error(error.response.data.message);
      default:
        return toast.error(`Error updating!`);
    }
  }
};

export const deliverParcel= (id, closeModal) => async (dispatch) => {
  dispatch({ type: PARCEL_LOADING});
  try {
    const response = await sendHttpRequest(`/parcels/${id}/deliver`, 'PATCH');
    dispatch({ type: DELIVER_PARCEL, payload: response.parcel });
    toast.success(response.message);
    return closeModal();
    
  } catch (error) {
    switch (error.response.status) {
      case 400:
      case 404:
      case 401:
        closeModal();
        return toast.error(error.response.data.message);
      default:
        closeModal();
        return toast.error(`Cannot deliver order at the moment`);
    }
  }
};
