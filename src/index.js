import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import AppRouter from './AppRouters.jsx';

ReactDOM.render(<Provider store={store}><AppRouter/></Provider>, document.getElementById('app'));
