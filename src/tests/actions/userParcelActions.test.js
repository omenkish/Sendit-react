import thunk from 'redux-thunk';
import { toast } from 'react-toastify';
import configureMockStore from 'redux-mock-store';
import { sendHttpRequest } from '../../services/utils';
import {
  ADD_PARCEL,
  CHANGE_PARCEL_DESTINATION_SUCCESS,
  DELETE_PARCEL,
  GET_PARCEL_SUCCESS,
  GET_USER_PARCELS_SUCCESS,
  PARCEL_LOADING,
} from '../../redux/actions/types';
import {
  createParcel,
  cancelParcel,
  getParcel,
  getUserParcels,
  editDestination
} from '../../redux/actions/userParcelsAction';

jest.mock('../../services/utils');
jest.mock('react-toastify');
const mockStore = configureMockStore([thunk]);

const store = mockStore();

const parcel = {
  payload: [
    {
    id: 9,
    placed_by: 1,
    order_number: 'py11pyzr',
    description: 'testing',
    receiver_number: '0813333333',
    weight: 9,
    weight_metric: 'kg',
    sent_on: '2019-04-06T23:56:17.410Z',
    delivered_on: null,
    status: 'delivered',
    cancelled: false,
    sender_address: 'portharcourt',
    receiver_address: 'Ikorodu road',
    current_location: 'Ilorin',
    price: 42.3,
    zip: 12345,
    state: 'Gbagada',
    created_at: '2019-04-06T23:56:17.410Z',
    modified_at: '2019-04-06T23:56:17.410Z'
    }
  ]
};

const mockFn = jest.fn();
describe('Parcel action creators test', () => {
  beforeEach(() => {
    store.clearActions();
  });
  
  const id = 'f2d7da57-28c4-444b-840c-d9a78afe00cd';
  
  const getError = status => ({
    response: {
      status,
      data: {
        message: 'hello'
      }
    }
  });

  it('should create the ADD_PARCEL action', async () => {
    sendHttpRequest.mockResolvedValue({
      parcel: parcel.payload,
      message: 'Parcel created successfully'
    });
    const expectedActions = [
      { type: PARCEL_LOADING },
      { type: ADD_PARCEL, payload: parcel.payload },
    ];

    await store.dispatch(createParcel());
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });

  it('should create the ADD_PARCEL action', async () => {
    sendHttpRequest.mockRejectedValue(getError(400));
    await store.dispatch(createParcel());
    expect(toast.error).toHaveBeenCalledWith('hello');
  });

  it('should create the ADD_PARCEL action', async () => {
    sendHttpRequest.mockRejectedValue(getError(401));
    await store.dispatch(createParcel());
    expect(toast.error).toHaveBeenCalledWith('hello');
  });

  it('should create the ADD_PARCEL action', async () => {
    sendHttpRequest.mockRejectedValue(getError(409));
    await store.dispatch(createParcel());
    expect(toast.error)
      .toHaveBeenCalledWith('Error creating order');
  });
  it('should create the CANCEL_PARCEL action', async () => {
    sendHttpRequest.mockResolvedValue({
      parcel: parcel.payload,
      message: 'Parcel cancelled successfully'
    });
    const expectedActions = [
      { type: PARCEL_LOADING },
      { type: DELETE_PARCEL, id }
    ];

    await store.dispatch(cancelParcel(id, mockFn));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });

  it('should create the CANCEL_PARCEL action', async () => {
    sendHttpRequest.mockRejectedValue(getError(400));
    await store.dispatch(cancelParcel(id, mockFn));
    expect(toast.error).toHaveBeenCalledWith('hello');
  });

  it('should create the CANCEL_PARCEL action', async () => {
    sendHttpRequest.mockRejectedValue(getError(401));
    await store.dispatch(cancelParcel(id, mockFn));
    expect(toast.error).toHaveBeenCalledWith('hello');
  });

  it('should create the CANCEL_PARCEL action', async () => {
    sendHttpRequest.mockRejectedValue(getError(404));
    await store.dispatch(cancelParcel(id, mockFn));
    expect(toast.error).toHaveBeenCalledWith('hello');
  });
  
  it('should create the CANCEL_PARCEL action', async () => {
    sendHttpRequest.mockRejectedValue(getError(409));
    await store.dispatch(cancelParcel(id, mockFn));
    expect(toast.error).toHaveBeenCalledWith(`Cannot cancel this order at the moment.
          Please try again later`);
  });
  
  it('should create the GET_USER_PARCELS action', async () => {
    sendHttpRequest.mockResolvedValue({
      parcels: parcel.payload,
      message: 'Parcel fetched successfully'
    });
    const expectedActions = [
      { type: PARCEL_LOADING },
      { type: GET_USER_PARCELS_SUCCESS, payload: parcel.payload }
    ];
    await store.dispatch(getUserParcels(id));
    expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
    await store.dispatch(getUserParcels());
    expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
  });

  it('should create the GET_ALL_PARCELS action', async () => {
    sendHttpRequest.mockRejectedValue(getError());
    await store.dispatch(getUserParcels(id));
    expect(toast.error).toHaveBeenCalledWith('Error fetching parcels!');
  });

  it('should create the GET_ALL_PARCELS action', async () => {
    sendHttpRequest.mockRejectedValue(getError());
    await store.dispatch(getUserParcels());
    expect(toast.error).toHaveBeenCalledWith('Error fetching parcels!');
  });

  it('should create the GET_PARCEL action', async () => {
    sendHttpRequest.mockResolvedValue({
      parcel: parcel.payload,
      message: 'Parcel fetched successfully'
    });
    const expectedActions = [
      { type: PARCEL_LOADING },
      { type: GET_PARCEL_SUCCESS, id }
    ];

    await store.dispatch(getParcel(id));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });

  it('should create the GET_PARCEL action', async () => {
    sendHttpRequest.mockRejectedValue(getError(400));
    await store.dispatch(getParcel(id));
    expect(toast.error).toHaveBeenCalledWith('hello');
  });

  it('should create the GET_PARCEL action', async () => {
    sendHttpRequest.mockRejectedValue(getError(401));
    await store.dispatch(getParcel(id));
    expect(toast.error).toHaveBeenCalledWith('hello');
  });

  it('should create the GET_PARCEL action', async () => {
    sendHttpRequest.mockRejectedValue(getError(404));
    await store.dispatch(getParcel(id));
    expect(toast.error).toHaveBeenCalledWith('hello');
  });
  
  it('should create the GET_PARCEL action', async () => {
    sendHttpRequest.mockRejectedValue(getError(409));
    await store.dispatch(getParcel(id));
    expect(toast.error).toHaveBeenCalledWith(`Error getting parcel`);
  });
  it('should create the CHANGE_PARCEL_DESTINATION action', async () => {
    sendHttpRequest.mockResolvedValue({
      parcel: parcel.payload,
      message: 'Parcel destination changed successfully'
    });
    const expectedActions = [
      { type: PARCEL_LOADING },
      { type: CHANGE_PARCEL_DESTINATION_SUCCESS, id }
    ];

    await store.dispatch(editDestination(id, {location: 'home'},mockFn));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });

  it('should create the CHANGE_PARCEL_DESTINATION action', async () => {
    sendHttpRequest.mockRejectedValue(getError(400));
    await store.dispatch(editDestination(id, mockFn));
    expect(toast.error).toHaveBeenCalledWith('hello');
  });

  it('should create the CHANGE_PARCEL_DESTINATION action', async () => {
    sendHttpRequest.mockRejectedValue(getError(401));
    await store.dispatch(editDestination(id, mockFn));
    expect(toast.error).toHaveBeenCalledWith('hello');
  });

  it('should create the CHANGE_PARCEL_DESTINATION action', async () => {
    sendHttpRequest.mockRejectedValue(getError(404));
    await store.dispatch(editDestination(id, mockFn));
    expect(toast.error).toHaveBeenCalledWith('hello');
  });
  
  it('should create the CHANGE_PARCEL_DESTINATION action', async () => {
    sendHttpRequest.mockRejectedValue(getError(409));
    await store.dispatch(editDestination(id, mockFn));
    expect(toast.error).toHaveBeenCalledWith(`Error changing destination!`);
  });
});
