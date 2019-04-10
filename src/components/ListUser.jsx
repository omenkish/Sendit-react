import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table, Modal } from 'react-bootstrap';
import moment from 'moment';
import { createAdmin } from '../redux/actions/userActions';
import style from '../assets/css/style.css';


export class UsersList extends Component {

  state = {
    modalIsOpen: false,
  }
  createAdmin =  async () => {
    await this.props.createAdmin(this.state.selectedParcelId, this.closeModal);
  }
  openAdminModal = (id) => {
    this.setState({ modalIsOpen: true, selectedParcelId: id });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false, modalContent: null });
  }

  render() {
    const { users } = this.props;

    const modalBody = (
      <div>
        <div> <h3>Sure to make this user an admin? </h3></div>
        <p> This decision cannot be reversed </p>
        <div>
          <button onClick={this.closeModal} className="btn btn-outline-info mr-2">No</button>
          <button onClick={this.createAdmin} className="btn btn-danger">Yes</button>
        </div>
      </div>
    );

    return (
        <>
        <Table responsive="sm" striped bordered size="sm" className={style.table}>
          <thead>
            <tr className="text text-center">
              <th>S/N</th>
              <th>Full Name</th>
              <th>Phone No.</th>
              <th>Email </th>
              <th>Date Registered </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                users.map((user, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td style={{textTransform:'capitalize'}}>
                    {`${user.firstname} ${user.othernames && user.othernames} ${user.lastname}`}
                    </td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{moment(user.registered_on).format('LL')}</td>
                  <td >
                    <Link to={`/users/${user.id}/parcels`}>
                      <button 
                      className="btn btn-outline-info btn-sm mr-2"
                      >Parcels</button>
                    </Link>
                    {
                      !user.is_admin && <>
                        <button 
                          onClick={() => this.openAdminModal(user.id)}
                          className="btn btn-outline-success btn-sm"
                        >Make Admin</button>
                      </>
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        <Modal 
          show={this.state.modalIsOpen}
          onHide={this.closeModal}
          size="md"
          dialogClassName="mt-3"
        
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Admin</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalBody}</Modal.Body>
        </Modal>
        </>
    );
  }
}

UsersList.propTypes = {
  createAdmin: PropTypes.func,
  users: PropTypes.array.isRequired
}
export default connect(null, { createAdmin })(UsersList);
