import userParcelsReducer from '../../redux/reducers/userParcelsReducer';
import {
  ADD_PARCEL,
  CHANGE_PARCEL_DESTINATION_SUCCESS,
  DELETE_PARCEL,
  GET_PARCEL_SUCCESS,
  GET_USER_PARCELS_SUCCESS,
  PARCEL_LOADING
} from '../../redux/actions/types';
import parcels from '../fixtures/parcels';

const initialState1 = {
  parcels: [ ...parcels ],
  parcel: {},
  isLoading: false,
  error: ''
};

const responseData = { parcels: [{ cancelled: false }] };
describe('UserParcelReducer test', () => {
  const action = {
    payload: {
      order_number: 12343
    }
  };

  it('should test for the the initial state', () => {
    expect(userParcelsReducer(undefined, {})).toEqual({
      ...initialState1,
      parcels: []
    });
  });

  it('should handle the PARCEL_LOADING action', () => {
    expect(userParcelsReducer(initialState1, { type: PARCEL_LOADING })).toEqual({
      ...initialState1,
      isLoading: true
    });
  });
  it('should handle the ADD_PARCEL action', () => {
    expect(
      userParcelsReducer(initialState1, {
        type: ADD_PARCEL,
        payload: action.payload
      })
    ).toEqual({
      ...initialState1,
      parcels: [action.payload, ...initialState1.parcels]
    });
  });

  it('should handle the CANCEL_PARCEL action', () => {
    expect(userParcelsReducer(initialState1, { type: DELETE_PARCEL, id: 1 , payload: action.payload})).toEqual({
      ...initialState1,
      parcels: parcels.map(parcel => parcel.order_number === action.payload.order_number ? action.payload : parcel)
    });
  });

  it('should handle the CHANGE_PARCEL_DESTINATION action', () => {
    expect(userParcelsReducer(initialState1, { type: CHANGE_PARCEL_DESTINATION_SUCCESS, id: 1 , payload: action.payload})).toEqual({
      ...initialState1,
      parcels: parcels.map(parcel => (parcel.order_number === action.payload.order_number ? action.payload : parcel))
    });
  });
  it('should handle the GET_USER_PARCELS_SUCCESS action', () => {
    expect(
      userParcelsReducer(initialState1, {
        type: GET_USER_PARCELS_SUCCESS,
        payload: action.payload
      })
    ).toEqual({
      ...initialState1,
      parcels: action.payload
    });
  });

  it('should handle the GET_PARCEL_SUCCESS action', () => {
    expect(
      userParcelsReducer(initialState1, {
        type: GET_PARCEL_SUCCESS,
        payload: action.payload
      })
    ).toEqual({
      ...initialState1,
      parcel: action.payload
    });
  });

});
