import {
  GET_USER,
  GET_USERS,
  USER_LOADING,
  CREATE_ADMIN
  
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
    case CREATE_ADMIN:
      return {
        ...state,
        isLoading: false,
        users: state.users.map(user => (user.id === action.payload.id ? action.payload : user))
      };
    default:
      return state;
  }
}