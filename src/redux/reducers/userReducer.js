import {
  GET_USER,
  GET_USER_FAILURE,
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
    
    default:
      return state;
  }
}