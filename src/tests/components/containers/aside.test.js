import React from 'react';
import { shallow } from 'enzyme';
import Aside from '../../../components/common/Aside.jsx';
import users from '../../fixtures/users';
const wrapper = shallow(<Aside user={users[0]}/>);

describe('Test Side Nav', () => {
  it('Should render sidenav', () => {
    expect(wrapper.length).toBe(1);
  });
});