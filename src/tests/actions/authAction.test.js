import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { sendHttpRequest } from '../../services/utils';
import { postRequest } from '../../redux/actions/authAction';
import users from '../fixtures/users';

jest.mock('../../services/utils');
const mockStore = configureMockStore([thunk]);

const store = mockStore();

describe('Test auth actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  
  const id = 'f2d7da57-28c4-444b-840c-d9a78afe00cd';
  
  it('should create the LOGIN action', async () => {
    sendHttpRequest.mockResolvedValue({
      message: 'User logged in successfully'
    });
    const expectedActions = [
      { type: 'AUTH_LOADING' },
      { type: 'LOGIN_USER'},
    ];

    await store.dispatch(postRequest(users[0],'auth/login', {type: 'LOGIN_USER'}, {type:'LOGIN_USER_FAIL'}));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create the LOGIN_FAIL action', async () => {
    sendHttpRequest.mockRejectedValue({
        response:{
          data:{
            message: 'Failed to log user in'
          }
        }
      ,
      message: 'Failed to log user in'
    });
    const expectedActions = [
      { type: 'AUTH_LOADING' },
      { type: 'LOGIN_USER_FAIL', payload: 'Failed to log user in'},
    ];

    await store.dispatch(postRequest(users[0],'auth/login', {type: 'LOGIN_USER'}, {type:'LOGIN_USER_FAIL'}));
    expect(store.getActions()).toEqual(expectedActions);
  });
});