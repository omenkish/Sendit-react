import { combineReducers } from 'redux';
import authReducer from './authReducer';
import parcelReducer from './parcelReducer';
import userParcelReducer from './userParcelsReducer';
import userReducer from './userReducer';

export default combineReducers({
  auth: authReducer,
  allParcels: parcelReducer,
  userParcels: userParcelReducer,
  users: userReducer,
});