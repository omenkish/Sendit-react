import React, { Component } from 'react'
import { Router, Route , Switch, Link, NavLink} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import store from './redux/store/store';
import '!style-loader!css-loader!react-toastify/dist/ReactToastify.css'; 
import { decodeToken, logout } from './services/authService';
import AllParcelsPage from './components/AllParcelsPage.jsx'
import CreateParcelPage from './components/CreateParcelPage.jsx';
import DashboardPage from './components/DashboardPage.jsx';
import Header from './components/common/Header.jsx';
import HomePage from './components/HomePage.jsx';
import LoginPage from './components/LoginPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import RegisterPage from './components/RegisterPage.jsx';
import UserParcelsPage from './components/UserParcelsPage.jsx';
import UsersPage from './components/UsersPage.jsx';
import AdminRoute from './services/admin';
import PrivateRoute from './services/authenticate';
import { history } from './redux/store/store'

// const user = decodeToken();
// if (user) {
//   store.dispatch({
//     type: 'SET_CURRENT_USER',
//   });
// } else {
//   logout();
// }

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header/>
      <ToastContainer autoClose={3000} position="top-right" />
      <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route path="/login" component={LoginPage} exact/>
        <Route path="/register" component={RegisterPage} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/create" component={CreateParcelPage} />
        <PrivateRoute path="/profile" component={ProfilePage} />
        <AdminRoute path="/users/:id/parcels" component={UserParcelsPage} />
        <AdminRoute path="/users" component={UsersPage} />
        <AdminRoute path="/all-orders" component={AllParcelsPage} />
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  </Router>
);

export default AppRouter;