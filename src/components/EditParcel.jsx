import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editDestination } from '../redux/actions/userParcelsAction';
import Form from 'react-bootstrap/Form';

class EditParcel extends Component {

  state = {
    receiver_address: '', 
    zip: '', 
    state: '',
    error: ''
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const {receiver_address, zip, state } = this.state;
    if(!receiver_address || !zip || !state) {
      this.setState({ error: 'Please provide receiver_address zip code and state.'})
    }
    else {
      const data = {
        receiver_address,
        zip,
        state
      }
      this.setState({ error: ''});
      await this.props.editDestination(this.props.id, data, this.props.closeModal );

    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value});
  }
  render() { 
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group >
            <Form.Control size="md" type="text" id="receiver_address" onChange={this.handleChange} placeholder="Enter new destination" required/>
          </Form.Group>

          <Form.Group >
            <Form.Control size="md" type="number" id="zip" onChange={this.handleChange} placeholder="Enter zip code" required/>
          </Form.Group>

          <Form.Group >
            <Form.Control type="text" id="state" onChange={this.handleChange} placeholder="Enter new state" required/>
          </Form.Group>
          {
            this.state.error && <Form.text className="text text-danger"></Form.text>
          }
          <Form.Group >
            <button type="submit" className="btn btn-danger">Save Changes</button>
          </Form.Group>
        </Form>
      </div>
      )
  }
}

EditParcel.propTypes = {
  id: PropTypes.string.isRequired
}
export default connect(null, { editDestination })(EditParcel);