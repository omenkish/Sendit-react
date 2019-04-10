import React from 'react';
import { shallow } from 'enzyme';
import { ProfilePage } from '../../components/ProfilePage.jsx';
import users from '../fixtures/users';
import parcels from '../fixtures/parcels';

const mockFn = jest.fn();
const props = {
  getUser: mockFn,
  getUserParcels: mockFn,
  user: users[0],
  parcels: parcels
};

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

const wrapper = shallow(<ProfilePage id='1' {...props}/>);
describe('Test Profile page component', () => {
  it('should render profile page component', () => {
    expect(wrapper.length).toEqual(1);
    wrapper.instance().componentDidMount();
  });

});
