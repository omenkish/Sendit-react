import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Aside from './common/Aside.jsx';
import { getAllParcels } from '../redux/actions/parcelActions';
import ParcelsList from './ParcelsList.jsx';
import style from '../assets/css/style.css';

class DashboardPage extends Component {
  componentDidMount(){
    this.props.getAllParcels();
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
              <div id={style.profileTitle}><h1>All Orders Section</h1></div>
                <ParcelsList parcels={this.props.parcels}/>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
} 

DashboardPage.propTypes = {
  getAllParcels: PropTypes.func.isRequired,
  parcels: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  parcels: state.allParcels.parcels
});
export default connect(mapStateToProps, { getAllParcels })(DashboardPage);