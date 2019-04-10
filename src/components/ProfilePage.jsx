import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import { Card } from 'react-bootstrap';
import Aside from './common/Aside.jsx';
import { getUser } from '../redux/actions/userActions'
import { getUserParcels } from '../redux/actions/userParcelsAction';
import style from '../assets/css/style.css';
export class ProfilePage extends Component {

  componentDidMount() {
    if(process.env.NODE_ENV !== 'test'){
      const decoded = jwt_decode(localStorage.getItem('token'));
      const {getUser, getUserParcels } = this.props;
      getUserParcels();
      getUser(decoded.id);
    }
   
  }

  render() {
    const { user, parcels} = this.props;
    const deliveredOrders = parcels.filter( parcel => parcel.status === 'delivered').length;
    const transitingOrders = parcels.filter( parcel => parcel.status !== 'delivered').length;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <section id={style.left}>
              <Aside/>
            </section>
          </div>
          <div className={`${style.pageContent} col-md-9 ml-5`}>
              <div id={style.profileTitle}><h1>My Profile</h1></div>
                  
                <div className="rows">
                  <div className="col-sm-12">
                  <section>
                    <div className={style.box}>
                      <div className={style.orderBox} id={style.profileBox}>
                          <div>
                            <img src={require('../assets/images/top.PNG')} className={style.avatar} />
                          </div>
                          <div>
                            <strong><span>Full Name: </span></strong> <span>{`${user.firstname} ${user.lastname}`}</span>
                          </div>
                          <div>
                            <strong><span>Phone: </span></strong> <span>{user.phone}</span>
                          </div>
                          <div>
                          <strong><span>Email: </span></strong> <span>{user.email}</span>
                          </div>
                          <div>
                          <strong><span>Registered On: </span></strong> <span>{moment(user.registered_on).format('LL')}</span>
                          </div>
                        </div>
                      <div className={style.orderBox} id={style.profileBox} >
                        <h2>On Transit/pending</h2>
                        <span className="fa-stack fa-5x stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-shipping-fast fa-stack-1x fa-inverse"></i>
                        </span><h2><span className="text-info">{transitingOrders}</span> on Transit</h2>
                      
                      </div>

                      <div className={style.orderBox} id={style.profileBox}>
                          <h2>Delivered </h2>
                          <span className="fa-stack fa-5x stack">
                              <i className="fa fa-square fa-stack-2x"></i>
                              <i className="fa fa-clipboard-check fa-stack-1x fa-inverse"></i>
                          </span><h2 ><span className="text-success">{deliveredOrders}</span> Delivered</h2>  
                      </div>
          
                    </div>
                    </section>
                  </div>
                  
                </div>
          </div>
        </div>
        
      </div>
    );
  }
}

ProfilePage.propTypes = {
  id: PropTypes.string,
  getUser: PropTypes.func.isRequired,
  getUserParcels: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  loading: state.userParcels.isLoading,
  parcels: state.userParcels.parcels,
  user: state.users.user
})
export default connect(mapStateToProps, { getUserParcels, getUser })(ProfilePage);
