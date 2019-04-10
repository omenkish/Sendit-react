import React from 'react';
import { shallow } from 'enzyme';
import ParcelItem from '../../components/ParcelItem.jsx';
import parcels from '../fixtures/parcels';

const wrapper = shallow(<ParcelItem parcel={parcels[0]} />);
describe('Test Parcel Item Component', () => {
  it('should correctly render parsel Item component', () => {
    expect(wrapper.length).toBe(1);
  });
});

const wrapper1 = shallow(<ParcelItem parcel={parcels[1]} />)
describe('Test Parcel Item Component', () => {
  it('should correctly render parsel Item component', () => {
    expect(wrapper1.length).toBe(1);
  });
});