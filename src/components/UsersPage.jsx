import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Aside from './common/Aside.jsx';
import { getUsers } from '../redux/actions/userActions';
import ListUser from './ListUser.jsx';
import style from '../assets/css/style.css';

class UsersPage extends Component {
  componentDidMount(){
    this.props.getUsers();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <section id={style.left}>
              <Aside/>
            </section>
          </div>
          <div className="col-md-9 ml-5">
            <div className={style.pageContent}>
              <div id={style.profileTitle}><h1>All Users Section</h1></div>
                <ListUser users={this.props.users}/>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
} 

UsersPage.propTypes = {
  users: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  users: state.users.users
});
export default connect(mapStateToProps, { getUsers })(UsersPage);