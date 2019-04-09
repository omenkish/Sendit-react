import { toast } from 'react-toastify';
import { sendHttpRequest } from '../../services/utils';
import { 
  CREATE_ADMIN,
  GET_USER,
  GET_USERS,
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

export const getUsers = () => async (dispatch) => {
  dispatch({ type: USER_LOADING});
  try {
    const response = await sendHttpRequest('/users', 'GET');
    return dispatch({ type: GET_USERS, payload: response.users})
  } catch ({ response }) {
    return toast.error(response.data.message );
  }
};

export const createAdmin= (id, closeModal) => async (dispatch) => {
  dispatch({ type: USER_LOADING});
  try {
    const response = await sendHttpRequest(`/users/${id}/createadmin`, 'PATCH');
    dispatch({ type: CREATE_ADMIN, payload: response.user});
    toast.success('This user is now an admin');
    return closeModal();
    
  } catch (error) {
    switch (error.response.status) {
      case 400:
      case 404:
      case 401:
        return toast.error(error.response.data.message);
      default:
        return toast.error(`Cannot create admin at the moment!`);
    }
  }
};
