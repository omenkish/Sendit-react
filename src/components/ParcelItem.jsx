import React from 'react'
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from '../assets/css/style.css';

const ParcelItem = ({ parcel }) => {
  return (
    <div className="container-fluid">
      <h2>{parcel.order_number}</h2>
      <div className={styles.modalParcelDetail}>
        <span><strong>Description</strong></span> 
        <span>{ parcel.description}</span>
      </div>
      <div className={styles.modalParcelDetail}>
        <span><strong>Cost</strong></span>
        <span>&#8358;{ parcel.price}</span>
      </div >
      <div className={styles.modalParcelDetail}>
        <span><strong>Receiver Address</strong></span> 
        <span>{ `${parcel.receiver_address}, zip: ${parcel.zip}. ${parcel.state}`}</span>
      </div>
      <div className={styles.modalParcelDetail}>
        <span><strong>Weight</strong></span> 
        <span>{ `${parcel.weight} ${parcel.weight_metric}`}</span>
      </div>
      <div className={styles.modalParcelDetail}>
        <span><strong>Status</strong></span> 
        <span>{ parcel.cancelled ? 'Cancelled' : 'Active' }</span>
      </div>
      <div className={styles.modalParcelDetail}>
        <span><strong>Delivery Status</strong></span>
        <span>{ parcel.status}</span>
      </div>
      <div className={styles.modalParcelDetail}>
        <span><strong>Date Created</strong></span>
        <span>{ moment(parcel.created_at).fromNow()}</span>
      </div>
    </div>
  );
}

ParcelItem.propTypes = {
  parcel: PropTypes.object,
}

export default ParcelItem;