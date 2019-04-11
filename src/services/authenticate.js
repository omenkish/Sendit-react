import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isLoggedIn } from './authService';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!isLoggedIn()) {
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        );
      }
      return <Component {...props} />;
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func,
  auth: PropTypes.object,
  location: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
