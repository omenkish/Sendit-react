import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from '../../components/LoginPage.jsx';
import { FormContainer } from '../../components/container/LoginFormContainer';

const mockFn = jest.fn();
const props = {
  postRequest: mockFn,
  auth: {
    isLoading: true,
    error: 'hey man'
  },
  history: {
    push: mockFn
  }
};

const wrapper1 = shallow(<LoginPage />);
describe('Test CommentForm component', () => {
  
  it('should render login page component', () => {

    expect(wrapper1.find('div').length).toBe(1);
  });

});

const mockTarget =  (id, value ) => ({
  target: {
    id,
    value
  }
});

const wrapper = shallow(<FormContainer {...props}/>);

describe('Test CommentForm component', () => {

  it('should render empty string for invalid form submission', () => {
    wrapper.find('Form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(wrapper.state('email').length).toBe(0);
  });

  it('should test functions', () => {

    const handleSpy = jest.spyOn(wrapper.instance(), 'handleChange');
    handleSpy(mockTarget('email', 'Test'))
    expect(wrapper.instance().state.email).toEqual('Test')
    handleSpy(mockTarget('password', 'Test password'))
    expect(wrapper.instance().state.password).toEqual('Test password')
  });

  it('component will receive props should set state to errorMessage', ()=> {
    wrapper.setProps({
      auth: {
        errorMessage: 'error'
      }
    })
    expect(wrapper.instance().state.error).toEqual('error')
  }) 

  it('should call history.push if user is authenticated',() => {
    wrapper.setProps({
      auth: {
        isAuthenticated: true
      }
    })
    expect(wrapper.instance().props.history.push).toBeCalledWith('/dashboard')
  })
});

