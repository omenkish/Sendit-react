import React from 'react';
import { mount, shallow } from 'enzyme';
import { UsersList } from '../../components/ListUser';
import users from '../fixtures/users';
import parcels from '../fixtures/parcels';

const mockFn = jest.fn();
const props = {
  getUser: mockFn,
  getUserParcels: mockFn,
  users: users,
  parcels: parcels,
  createAdmin: mockFn
};

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

const wrapper = shallow(<UsersList  {...props}/>);
describe('Test Profile page component', () => {
  it('should render profile page component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should call createAdmin', () => {
    const createAdminSpy = jest.spyOn(wrapper.instance(), 'createAdmin');
    createAdminSpy();
    expect(wrapper.instance().props.createAdmin).toBeCalled()
  })


  it('open Admin Modal should set state to true', () => {
    const openAdminModal = jest.spyOn(wrapper.instance(), 'openAdminModal');
    openAdminModal('2');
    wrapper.find('button').at(2).simulate('click');
    expect(wrapper.instance().state.modalIsOpen).toEqual(true);
    expect(openAdminModal).toHaveBeenCalled()
  })

  it('close modal should set state to false', () => {
    const closeModal = jest.spyOn(wrapper.instance(), 'closeModal');
    closeModal();
    expect(wrapper.instance().state.modalIsOpen).toEqual(false);
  })
});
