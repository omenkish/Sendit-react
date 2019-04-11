import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Modal } from 'react-bootstrap';
import EditParcel from './EditParcel.jsx';
import Parcelitem from './ParcelItem.jsx';
import { getParcel } from '../redux/actions/userParcelsAction';
import { changeLocation, deliverParcel } from '../redux/actions/parcelActions';
import style from '../assets/css/style.css';


class ParcelsList extends Component {

  state = {
    modalIsOpen: false,
  }
  handleDetailsClick = (parcelId) => async (e) => {
    await this.props.getParcel(parcelId);
    this.setState({ modalIsOpen: true, modalContent: 'details' });
  }
  handleDeliverClick =  async () => {
    await this.props.deliverParcel(this.state.selectedParcelId, this.closeModal);
  }
  openDeliverModal = (id) => {
    this.setState({ modalIsOpen: true, modalContent: 'deliver', selectedParcelId: id });
  }

  openEditModal = (id) => {
    this.setState({ modalIsOpen: true, modalContent: 'edit', selectedParcelId: id });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false, modalContent: null });
  }

  render() {
    const { parcels, parcel, changeLocation } = this.props;
    const { modalContent } = this.state;

    const deliverModal = (
      <div>
        <div> <h3>Sure to mark order as delivered? </h3></div>
        <div>
          <button onClick={this.closeModal} className="btn btn-outline-info mr-2">No</button>
          <button onClick={this.handleDeliverClick} className="btn btn-danger">Yes</button>
        </div>
      </div>
    );

    let modalBody;
    if(modalContent === 'details'){
      modalBody = <Parcelitem parcel={parcel}/>;
    }
    else if(modalContent === 'edit'){
      modalBody = <EditParcel
        type=''
        submitFunction={changeLocation}
        id={this.state.selectedParcelId}
        closeModal={this.closeModal}/>
    }
    else if(modalContent === 'deliver'){
      modalBody = deliverModal;
    }
    else {
      modalBody = '';
    }

    let title;
    if(modalContent === 'details'){
      title = 'Parcel Details';
    }
    else if(modalContent === 'edit'){
      title = 'Edit Parcel Location';
    }
    else {
      title = 'Deliver Parcel Order';
    }

    return (
        <>
        <Table responsive="sm" striped bordered size="sm" >
          <thead>
            <tr className="text text-center">
              <th>S/N</th>
              <th>Order No.</th>
              <th>Receiver No.</th>
              <th>Destination </th>
              <th>Cur. Location </th>
              <th>Shipping Status</th>
              <th>Cancelled</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            {
                parcels.map((parcel, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td><span onClick={this.handleDetailsClick(`${parcel.order_number}`)}>{parcel.order_number}</span></td>
                  <td>{parcel.receiver_number}</td>
                  <td>{`${parcel.receiver_address}. ${parcel.state}`}</td>
                  <td>{parcel.current_location}</td>
                  <td>{parcel.status}</td>
                  <td>{parcel.cancelled ? 'Yes' : 'No'}</td>
                  <td >
                    <button 
                    className="btn btn-outline-info btn-sm mr-2"
                    onClick={this.handleDetailsClick(`${parcel.order_number}`)}
                    >Details</button>
                    {
                      ((!parcel.cancelled && parcel.status !== 'delivered') && <>
                        <button
                        onClick={() => this.openEditModal(parcel.order_number)}
                        className="btn btn-outline-secondary btn-sm mr-2"
                        >Edit</button>
                        <button 
                          onClick={() => this.openDeliverModal(parcel.order_number)}
                          className="btn btn-outline-danger btn-sm"
                        >Deliver</button>
                      </>)
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        <Modal show={this.state.modalIsOpen}
          onHide={this.closeModal}
          size={modalContent === 'details' ? 'lg' : 'md'}
          dialogClassName="mt-3"
        
        >
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalBody}</Modal.Body>
            {
              modalContent === 'details' && (
                <Modal.Footer>
            <button className="btn btn-outline-secondary" onClick={this.closeModal}>
              Close
            </button>
            </Modal.Footer>
              )
            }
        </Modal>
        </>
    );
  }
}

ParcelsList.propTypes = {
  getParcel: PropTypes.func.isRequired,
  changeLocation: PropTypes.func,
  deliverParcel: PropTypes.func,
  parcel: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  parcel: state.userParcels.parcel,

});
export default connect(mapStateToProps, { changeLocation, deliverParcel, getParcel })(ParcelsList);
