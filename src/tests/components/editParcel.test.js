import React from 'react';
import { shallow } from 'enzyme';
import { EditParcel } from '../../components/EditParcel.jsx';
import parcels from '../fixtures/parcels';

const mockFn = jest.fn();
const props = {
  type: 'destination',
  submitFunction: mockFn,
  getUserParcels: mockFn,
  closeModal: mockFn,
  EditParcel: mockFn,
  parcels: parcels
};


const wrapper = shallow(<EditParcel id='1' {...props}/>);
wrapper.setState({
  receiver_address: '', 
  zip: '', 
  state: '',
  location: '',
  error: ''
});

const mockTarget =  (id, value ) => ({
  target: {
    id,
    value
  }
});

describe('Test Profile page component', () => {
  wrapper.setState({
    receiver_address: '', 
    zip: '', 
    state: '',
    location: '',
    error: ''
  });
  it('should render Edit parcel page component', () => {
    expect(wrapper.length).toEqual(1);
  });
  it('should test functions', () => {

    const handleSpy = jest.spyOn(wrapper.instance(), 'handleChange');
    handleSpy(mockTarget('receiver_address', 'Test'))
    expect(wrapper.instance().state.receiver_address).toEqual('Test');
    handleSpy(mockTarget('zip', 'Test zip'));
    expect(wrapper.instance().state.zip).toEqual('Test zip');
    handleSpy(mockTarget('state', 'Test state'));
    expect(wrapper.instance().state.state).toEqual('Test state');
    handleSpy(mockTarget('location', 'Test location'));
    expect(wrapper.instance().state.location).toEqual('Test location');
  });

});