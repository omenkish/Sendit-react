import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Circle } from 'better-react-spinkit';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { postRequest } from '../../redux/actions/authAction';
import styles from '../../assets/css/signin.css';

class RegisterFormContainer extends Component {
  // Initial state of user
   state = {
      firstname: '',
      lastname: '',
      othernames: '',
      phone: '',
      email: '',
      password: '',
    };

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value});
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const signupData = this.state;
    this.props.postRequest(signupData, 'auth/signup', {type: 'SIGNUP_USER'}, {type:'SIGNUP_USER_FAIL'});
  }

  componentDidUpdate(prevProps, prevState) {
    
    if(prevProps.auth !== this.props.auth){
      if(this.props.auth.errorMessage) {
        this.setState({error: this.props.auth.errorMessage })
      }
      if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard')
      }
    }
  }
  render() {
    const { firstname, lastname:lastName, othernames:otherNames, phone, email, password} = this.state;
    const { isLoading, error: reduxError } = this.props.auth;
    return (<>

      <Form id={styles.create} onSubmit={this.handleSubmit}>
        <div className="mb-sm-4"><h1>Create Account <i className="fa fa-plus-circle"></i> </h1></div>
          { reduxError && <div className={styles.error} >{reduxError}</div>}

          <Form.Group >
            <Form.Control size="md" 
              type="text"
              id="firstname"
              value={firstname}
              placeholder="Enter your firstname"
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Form.Group >
            <Form.Control size="md" 
              type="text"
              id="lastname"
              value={lastName}
              placeholder="Enter your lastname"
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          <Form.Group >
            <Form.Control size="md" 
              type="text"
              id="othernames"
              value={otherNames}
              placeholder="Enter your other names"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group >
            <Form.Control size="md" 
              type="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          <Form.Group >
            <Form.Control size="md" 
              type="tel"
              id="phone"
              value={phone}
              placeholder="Enter your phone number"
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          <Form.Group >
            <Form.Control size="md" 
              type="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={this.handleChange}
              required
            />
          </Form.Group>

        <div className="mb-sm-4">
          <button type="submit" disabled={isLoading}> Create Account
          {isLoading && (
              <span className={styles.buttonLoading}>
                <Circle color={'rgba(255,255,255,1)'} />
              </span>
            )}
          </button>
          <span className={styles.spa}> Already a member? <Link to="/login">Sign in</Link></span>
        </div>
      </Form>
      </>
    );
  }
}
RegisterFormContainer.propTypes = {
  postRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
 });

 export default connect(mapStateToProps, { postRequest })(RegisterFormContainer);