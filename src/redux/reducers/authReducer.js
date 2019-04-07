const initialState = {
  isAuthenticated: false,
  user: {},
  isLoading: false,
  error: ''
};

export default (state=initialState, action) => {
  switch (action.type) {
    case 'AUTH_LOADING':
      return {
        ...state,
        isLoading: true
      };
    case 'LOGIN_USER':
      return {
        ...state,
        isAuthenticated: true,
        user:action.payload
      };
    case 'LOGIN_USER_FAIL':
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload
      };
      case 'SIGNUP_USER':
      return {
        ...state,
        isAuthenticated: true,
        user:action.payload
      };
    case 'SIGNUP_USER_FAIL':
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload
      };
    default:
      return state;
  }
}