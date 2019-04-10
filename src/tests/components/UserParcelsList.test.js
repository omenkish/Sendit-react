import React from 'react';
import { mount, shallow } from 'enzyme';
import { UserParcelsList } from '../../components/UserParcelsList';
import users from '../fixtures/users';
import parcels from '../fixtures/parcels';

const mockFn = jest.fn();
const props = {
  getUser: mockFn,
  getUserParcels: mockFn,
  users: users,
  parcels: parcels,
  getParcel: mockFn,
  cancelParcel: mockFn
};

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

const wrapper = shallow(<UserParcelsList  {...props}/>);
describe('Test Profile page component', () => {
  it('should render profile page component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should call handleDetailsClick', () => {
    const handleSpy = jest.spyOn(wrapper.instance(), 'handleDetailsClick');
    handleSpy('2')();
    expect(wrapper.instance().props.getParcel).toBeCalledWith('2');
  });


  it('should call handleCancelClick', () => {
    const handleCancelClickSpy = jest.spyOn(wrapper.instance(), 'handleCancelClick');
    handleCancelClickSpy('2');
    expect(wrapper.instance().props.cancelParcel).toBeCalled();
  });

  it('should call openDeleteModal', () => {
    const openDeleteModal = jest.spyOn(wrapper.instance(), 'openDeleteModal');
    wrapper.find('button').at(2).simulate('click');
    expect(openDeleteModal).toHaveBeenCalledTimes(1);
  });
  

  it('should call openEditModal', () => {
    const openEditModal = jest.spyOn(wrapper.instance(), 'openEditModal');
    wrapper.find('button').at(1).simulate('click')
    expect(openEditModal).toHaveBeenCalledTimes(1);
  });
  


  it('should call closeModal', () => {
    const closeModal = jest.spyOn(wrapper.instance(), 'closeModal');
    closeModal('2');
    expect(wrapper.instance().state.modalIsOpen).toEqual(false)
  });
  
  




  // it('open Admin Modal should set state to true', () => {
  //   const openAdminModal = jest.spyOn(wrapper.instance(), 'openAdminModal');
  //   openAdminModal('2');
  //   wrapper.find('button').at(2).simulate('click');
  //   expect(wrapper.instance().state.modalIsOpen).toEqual(true);
  //   expect(openAdminModal).toHaveBeenCalled()
  // })

  // it('close modal should set state to false', () => {
  //   const closeModal = jest.spyOn(wrapper.instance(), 'closeModal');
  //   closeModal();
  //   expect(wrapper.instance().state.modalIsOpen).toEqual(false);
  // })
});
