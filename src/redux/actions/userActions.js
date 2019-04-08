import { toast } from 'react-toastify';
import { sendHttpRequest } from '../../services/utils';
import { 
  GET_USER,
  USER_LOADING
} from './types';

export const getUser = (id) => async (dispatch) => {
  dispatch({ type: USER_LOADING});
  try {
    const response = await sendHttpRequest(`/users/${id}`, 'GET');
    return dispatch({ type: GET_USER, payload: response.user})
  } catch (error) {
    switch (error.response.status) {
      case 400:
      case 404:
      case 401:
        return toast.error(error.response.data.message);
      default:
        return toast.error(`Error fetching user!`);
    }
  }
};