import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Circle } from 'better-react-spinkit';
import Form from 'react-bootstrap/Form';
import { postRequest } from '../../redux/actions/authAction';
import style from '../../assets/css/signin.css';

export class FormContainer extends Component {
    state = {
      email: "",
      password: "",
      error: ''
    };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.postRequest(this.state, 'auth/login', {type: 'LOGIN_USER'}, {type:'LOGIN_USER_FAIL'});
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.auth.errorMessage) {
      this.setState({error: nextProps.auth.errorMessage })
    }
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard')
} 
  }
  render() {
    const { email, password } = this.state;
    const { isLoading, error: reduxError } = this.props.auth;
    return (
      <Form id={style.login} onSubmit={this.handleSubmit}>
        <div><h1> Sign In <i className="fa fa-arrow-alt-circle-right"></i></h1></div>
          { reduxError && <div className={style.error}>{reduxError}</div>}

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
              type="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={this.handleChange}
              required
              />
          </Form.Group>

        <div>
          <button type="submit" disabled={isLoading}> Login
          {isLoading && (
              <span className={style.buttonLoading}>
                <Circle color={'rgba(255,255,255,1)'} />
              </span>
            )}
          </button>
        </div>
        <div className={style.bottomFormArea}>
          <span id={style.reg}>Not yet registered? <Link to="/register">Sign up</Link></span>
          <span className={style.psw}> <Link to="#">Forgot password?</Link></span>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
 });
 
 export default connect(mapStateToProps, { postRequest })(withRouter(FormContainer));