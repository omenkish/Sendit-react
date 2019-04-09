import {
  GET_USER,
  GET_USERS,
  USER_LOADING
  
} from '../actions/types';
const initialState = {
  users: [],
  user: {},
  isLoading: false
};

export default (state=initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_USER:
      return {
        ...state,
        isLoading: false,
        user: action.payload
      };
    case GET_USERS:
      return {
        ...state,
        isLoading: false,
        users: action.payload
      };
    default:
      return state;
  }
}