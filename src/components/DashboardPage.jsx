import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Aside from './common/Aside.jsx';
import { getUserParcels } from '../redux/actions/userParcelsAction';
import UserParcelsList from './UserParcelsList.jsx';
import style from '../assets/css/style.css';

class DashboardPage extends Component {
  componentDidMount(){
    this.props.getUserParcels();
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
              <div id={style.profileTitle}><h1>My Orders Section</h1></div>
                <UserParcelsList parcels={this.props.userParcels}/>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
} 

DashboardPage.propTypes = {
  getUserParcels: PropTypes.func.isRequired,
  userParcels: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  userParcels: state.userParcels.parcels
});
export default connect(mapStateToProps, {getUserParcels})(DashboardPage);