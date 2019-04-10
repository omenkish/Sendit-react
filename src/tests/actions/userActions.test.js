import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { toast } from 'react-toastify';
import { sendHttpRequest } from '../../services/utils';
import {
  CREATE_ADMIN,
  GET_USER,
  GET_USERS,
  USER_LOADING
} from '../../redux/actions/types';
import { getUser, getUsers, createAdmin } from '../../redux/actions/userActions';
import users from '../fixtures/users';

jest.mock('../../services/utils');
jest.mock('react-toastify');
const mockStore = configureMockStore([thunk]);

const store = mockStore();

describe('Test user actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  
  const id = 'f2d7da57-28c4-444b-840c-d9a78afe00cd';
  const mockFn = jest.fn();
  const getError = status => ({
    response: {
      status,
      data: {
        message: 'hello'
      }
    }
  });

  it('should create the GET_USER action', async () => {
    sendHttpRequest.mockResolvedValue({
      user: users[0],
      message: 'User fetched successfully'
    });
    const expectedActions = [
      { type: USER_LOADING },
      { type: GET_USER, payload: users[0]},
    ];

    await store.dispatch(getUser(id));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create the GET_USER action', async () => {
    sendHttpRequest.mockRejectedValue(getError(400));
    await store.dispatch(getUser(id));
    expect(toast.error).toHaveBeenCalledWith('hello');
  });

  it('should create the GET_USER action', async () => {
    sendHttpRequest.mockRejectedValue(getError(401));
    await store.dispatch(getUser(id));
    expect(toast.error).toHaveBeenCalledWith('hello');
  });

  it('should create the GET_USER action', async () => {
    sendHttpRequest.mockRejectedValue(getError(404));
    await store.dispatch(getUser(id));
    expect(toast.error).toHaveBeenCalledWith('hello');
  });

  it('should create the GET_USER action', async () => {
    sendHttpRequest.mockRejectedValue(getError(409));
    await store.dispatch(getUser(id));
    expect(toast.error)
      .toHaveBeenCalledWith('Error fetching user!');
  });

  it('should create the GET_USERS action', async () => {
    sendHttpRequest.mockResolvedValue({
      users: users,
      message: 'User fetched successfully'
    });
    const expectedActions = [
      { type: USER_LOADING },
      { type: GET_USERS, payload: users},
    ];

    await store.dispatch(getUsers(id));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create the GET_USERS action', async () => {
    sendHttpRequest.mockRejectedValue(getError(400));
    await store.dispatch(getUsers());
    expect(toast.error).toHaveBeenCalledWith('hello');
  });

  it('should create the GET_USERS action', async () => {
    sendHttpRequest.mockRejectedValue(getError());
    await store.dispatch(getUsers());
    expect(toast.error).toHaveBeenCalledWith('hello');
  });

  it('should create the CREATE_ADMIN action', async () => {
    sendHttpRequest.mockResolvedValue({
      user: users[0],
      message: 'admin created successfully'
    });
    const expectedActions = [
      { type: USER_LOADING },
      { type: CREATE_ADMIN, payload: users[0]},
    ];

    await store.dispatch(createAdmin(id, mockFn));
    expect(toast.success)
      .toHaveBeenCalledWith('This user is now an admin');
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create the CREATE_ADMIN action', async () => {
    sendHttpRequest.mockRejectedValue(getError(400));
    await store.dispatch(createAdmin(id, mockFn));
    expect(toast.error).toHaveBeenCalledWith('hello');
  });

  it('should create the CREATE_ADMIN action', async () => {
    sendHttpRequest.mockRejectedValue(getError(401));
    await store.dispatch(createAdmin(id, mockFn));
    expect(toast.error).toHaveBeenCalledWith('hello');
  });

  it('should create the CREATE_ADMIN action', async () => {
    sendHttpRequest.mockRejectedValue(getError(404));
    await store.dispatch(createAdmin(id, mockFn));
    expect(toast.error).toHaveBeenCalledWith('hello');
  });

  it('should create the GET_USER action', async () => {
    sendHttpRequest.mockRejectedValue(getError(409));
    await store.dispatch(createAdmin(id, mockFn));
    expect(toast.error)
      .toHaveBeenCalledWith('Cannot create admin at the moment!');
  });
});