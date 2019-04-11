import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { decodeToken} from '../../services/authService';
import styles from '../../assets/css/style.css'

export default () => (
    <aside id={styles.sidebar}>
      <div className="">
        <span>
          <NavLink to="/profile"><i className="fa fa-user"></i> Profile</NavLink>
        </span>
        <span>
          <NavLink to="/create"><i className="fa fa-plus"></i> Create order</NavLink>
        </span>
        <span>
          <NavLink to="/dashboard"><i className="fa fa-plus"></i> My orders</NavLink>
        </span>
        <span>
          <NavLink to="/users"><i className="fa fa-users"></i> All Users</NavLink>
        </span>
        <span>
          <NavLink to="/all-orders"><i className="fa fa-folder"></i> All orders</NavLink>
        </span>
        
      </div>
    </aside>
  );