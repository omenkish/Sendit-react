import React, { Component } from 'react'
import { Router, Route , Switch, Link, NavLink} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import CreateParcelPage from './components/CreateParcelPage.jsx';
import DashboardPage from './components/DashboardPage.jsx';
import EditPage from './components/EditParcelPage.jsx';
import Header from './components/common/Header.jsx';
import HomePage from './components/HomePage.jsx';
import LoginPage from './components/LoginPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import RegisterPage from './components/RegisterPage.jsx';
import ServicesPage from './components/ServicesPage.jsx';
import { history } from './redux/store/store'

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header/>
      <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route path="/services" component={ServicesPage} exact/>
        <Route path="/login" component={LoginPage} exact/>
        <Route path="/register" component={RegisterPage} exact/>
        <Route path="/dashboard" component={DashboardPage} exact/>
        <Route path="/create" component={CreateParcelPage} exact/>
        <Route path="/profile" component={DashboardPage} exact/>
        <Route path="/orders" component={DashboardPage} exact/>
        <Route path="/users" component={DashboardPage} exact/>
        <Route path="/all_orders" component={DashboardPage} exact/>
        <Route path="/parcels/edit/:id" component={DashboardPage} exact/>
        <Route path="/users/edit/:id" component={DashboardPage} exact/>
        <Route component={NotFoundPage}/>
        <ToastContainer />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;