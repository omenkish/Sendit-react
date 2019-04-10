import React from 'react';
import { shallow } from 'enzyme';
import Aside from '../../../components/common/Aside.jsx';

const wrapper = shallow(<Aside />);

describe('Test Side Nav', () => {
  it('Should render sidenav', () => {
    expect(wrapper.length).toBe(1);
  });
});