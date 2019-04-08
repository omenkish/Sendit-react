import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Modal } from 'react-bootstrap';
import Parcelitem from './ParcelItem.jsx';
import EditParcel from './EditParcel.jsx';
import { getParcel, cancelParcel } from '../redux/actions/userParcelsAction';
import style from '../assets/css/style.css';


class UserParcelsList extends Component {

  state = {
    modalIsOpen: false,
  }
  handleDetailsClick = (parcelId) => async (e) => {
    await this.props.getParcel(parcelId);
    this.setState({ modalIsOpen: true, modalContent: 'details' });
  }
  handleCancelClick =  async () => {
    await this.props.cancelParcel(this.state.selectedParcelId, this.closeModal);
  }
  openDeleteModal = (id) => {
    this.setState({ modalIsOpen: true, modalContent: 'delete', selectedParcelId: id });
  }

  openEditModal = (id) => {
    this.setState({ modalIsOpen: true, modalContent: 'edit', selectedParcelId: id });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false, modalContent: null });
  }
  render() {
    const { parcels, parcel, loading } = this.props;
    const { modalContent } = this.state;

    const deleteModal = (
      <div>
        <div> <h3>Are you sure you want to cancel this order? </h3></div>
        <div>
          <button onClick={this.closeModal} className="btn btn-outline-info mr-2">No</button>
          <button onClick={this.handleCancelClick} className="btn btn-danger">Yes</button>
        </div>
      </div>
    );

    let modalBody;
    if(modalContent === 'details'){
      modalBody = <Parcelitem parcel={parcel}/>
    }
    else if(modalContent === 'edit'){
      modalBody = <EditParcel  id={this.state.selectedParcelId} closeModal={this.closeModal}/>
    }
    else if(modalContent === 'delete'){
      modalBody = deleteModal;
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
      title = 'Cancel Parcel Order';
    }

    return (
        <>
        <Table responsive="sm" striped bordered size="sm" className={style.table}>
          <thead>
            <tr className="text text-center">
              <th>S/N</th>
              <th>Order No.</th>
              <th>Description</th>
              <th>Receiver No.</th>
              <th>Destination </th>
              <th>Cost (&#8358;)</th>
              <th>Status</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            {
                parcels.map((parcel, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td><span onClick={this.handleDetailsClick(`${parcel.order_number}`)}>{parcel.order_number}</span></td>
                  <td>{parcel.description}</td>
                  <td>{parcel.receiver_number}</td>
                  <td>{`${parcel.receiver_address}. ${parcel.state}`}</td>
                  <td>{parcel.price}</td>
                  <td>{parcel.cancelled ? 'Cancelled' : 'Active'}</td>
                  <td >
                    <button 
                    className="btn btn-outline-info btn-sm mr-3"
                    onClick={this.handleDetailsClick(`${parcel.order_number}`)}
                    >Details</button>
                    <button
                      onClick={() => this.openEditModal(parcel.order_number)}
                      className="btn btn-outline-secondary btn-sm mr-3"
                    >Edit</button>
                    <button 
                      onClick={() => this.openDeleteModal(parcel.order_number)}
                      className="btn btn-outline-danger btn-sm"
                    >Cancel</button>

                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        <Modal show={this.state.modalIsOpen}
          onHide={this.closeModal}
          size={modalContent === 'details' ? 'lg' : 'md'}
        
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

UserParcelsList.propTypes = {
  getParcel: PropTypes.func.isRequired,
  cancelParcel: PropTypes.func.isRequired,
  parcels: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  loading: state.userParcels.isLoading,
  parcel: state.userParcels.parcel
})
export default connect(mapStateToProps, { getParcel, cancelParcel })(UserParcelsList);
