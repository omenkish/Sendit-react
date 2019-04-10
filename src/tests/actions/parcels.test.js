import thunk from 'redux-thunk';
import { toast } from 'react-toastify';
import configureMockStore from 'redux-mock-store';
import { sendHttpRequest } from '../../services/utils';
import { getAllParcels, deliverParcel, changeLocation } from '../../redux/actions/parcelActions';
import {
  CHANGE_LOCATION,
  DELIVER_PARCEL,
  PARCEL_LOADING,
  GET_ALL_PARCELS
} from '../../redux/actions/types';
import parcels from '../fixtures/parcels';

jest.mock('../../services/utils');
jest.mock('react-toastify');
const mockStore = configureMockStore([thunk]);

const store = mockStore();
const mockFn = jest.fn();

describe('Test auth actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  
  const getError = status => ({
    response: {
      status,
      data: {
        message: 'hello'
      }
    }
  });
  const id = 'f2d7da57-28c4-444b-840c-d9a78afe00cd';
  
  it('should create the GET_ALL_PARCELS action', async () => {
    sendHttpRequest.mockResolvedValue({
      parcels, 
      message: 'User logged in successfully'
    });
    const expectedActions = [
      { type: PARCEL_LOADING },
      { type: GET_ALL_PARCELS, payload: parcels},
    ];

    await store.dispatch(getAllParcels());
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create the GET_ALL_PARCEL action', async () => {
    sendHttpRequest.mockRejectedValue(getError());
    await store.dispatch(getAllParcels());
    expect(toast.error)
      .toHaveBeenCalledWith('hello');
  });

  it('should create the CHANGE_LOCATION action', async () => {
    sendHttpRequest.mockResolvedValue({
      parcel: parcels[0],
      message: 'Parcel cancelled successfully'
    });
    const expectedActions = [
      { type: PARCEL_LOADING },
      { type: CHANGE_LOCATION, id }
    ];

    await store.dispatch(changeLocation(id, {data:'omenkish'}, mockFn));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });

  it('should create the CHANGE_LOCATION action', async () => {
    sendHttpRequest.mockRejectedValue(getError(400));
    await store.dispatch(changeLocation(id, {data:'omenkish'}, mockFn));
    expect(toast.error).toHaveBeenCalledWith('hello');
  });

  it('should create the CHANGE_LOCATION action', async () => {
    sendHttpRequest.mockRejectedValue(getError(401));
    await store.dispatch(changeLocation(id, {data:'omenkish'}, mockFn));
    expect(toast.error).toHaveBeenCalledWith('hello');
  });

  it('should create the CHANGE_LOCATION action', async () => {
    sendHttpRequest.mockRejectedValue(getError(404));
    await store.dispatch(changeLocation(id, {data:'omenkish'}, mockFn));
    expect(toast.error).toHaveBeenCalledWith('hello');
  });
  
  it('should create the CHANGE_LOCATION action', async () => {
    sendHttpRequest.mockRejectedValue(getError(409));
    await store.dispatch(changeLocation(id, {data:'omenkish'}, mockFn));
    expect(toast.error).toHaveBeenCalledWith(`Error updating!`);
  });

  it('should create the DELIVER_PARCEL action', async () => {
    sendHttpRequest.mockResolvedValue({
      parcel: parcels[1],
      message: 'Parcel delivered successfully'
    });
    const expectedActions = [
      { type: PARCEL_LOADING },
      { type: DELIVER_PARCEL, id }
    ];

    await store.dispatch(deliverParcel(id, mockFn));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });

  it('should create the DELIVER_PARCEL action', async () => {
    sendHttpRequest.mockRejectedValue(getError(400));
    await store.dispatch(deliverParcel(id, mockFn));
    expect(toast.error).toHaveBeenCalledWith('hello');
  });

  it('should create the DELIVER_PARCEL action', async () => {
    sendHttpRequest.mockRejectedValue(getError(401));
    await store.dispatch(deliverParcel(id, mockFn));
    expect(toast.error).toHaveBeenCalledWith('hello');
  });

  it('should create the DELIVER_PARCEL action', async () => {
    sendHttpRequest.mockRejectedValue(getError(404));
    await store.dispatch(deliverParcel(id, mockFn));
    expect(toast.error).toHaveBeenCalledWith('hello');
  });
  
  it('should create the DELIVER_PARCEL action', async () => {
    sendHttpRequest.mockRejectedValue(getError(409));
    await store.dispatch(deliverParcel(id, mockFn));
    expect(toast.error).toHaveBeenCalledWith(`Cannot deliver order at the moment`);
  });
});