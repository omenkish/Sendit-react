import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
          <div className="col-0 col-md-2">
            <section id={style.left}>
              <Aside/>
            </section>
          </div>
          <div className="col-12 col-lg-9" style={{position: 'unset'}}>
            <div className={style.pageContent}>
              
              <div id={style.profileTitle}><h1>My Orders Section</h1></div>

              { this.props.userParcels.length ? <UserParcelsList parcels={this.props.userParcels}/> : <h3 className="ml-4">
                  You currently have no parcel delivery Orders. <Link to="/create">Create</Link> one.
              </h3>
            }
                
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