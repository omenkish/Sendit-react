import { sendHttpRequest } from '../../services/utils';

export const postRequest = (userData, url, actionTypeObj, actionTypeFailObj) => async (dispatch) => {
  dispatch({type: 'AUTH_LOADING'})
  try {
    const response = await sendHttpRequest(url, 'post', userData);
    localStorage.setItem('token', response.token);
    return dispatch({ ...actionTypeObj, payload: response.data});   
  }
  catch (error) {
    return dispatch({ ...actionTypeFailObj, payload: error.response.data.message });
  }
}
