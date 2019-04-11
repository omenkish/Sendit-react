import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Aside from './common/Aside.jsx';
import Form from 'react-bootstrap/Form';
import TextArea from './common/TextArea.jsx';
import { createParcel } from '../redux/actions/userParcelsAction';
import style from '../assets/css/style.css';

class CreateParcel extends Component {
  state = {
    receiver_number: '',
    weight: '',
    description: '',
    weight_metric: 'kg', 
    sender_address: '', 
    receiver_address: '', 
    zip: '', 
    state: ''
  };
  
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value});
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const parcelData = this.state;
    await this.props.createParcel(parcelData);
    this.props.history.push('/dashboard');
  }
  render() {
    const { description, receiver_number, weight, 
      sender_address, receiver_address, 
      zip, state } = this.state;
    const options = [
      { text: 'Select weight', value: ''},
      { text: 'KG', value: 'kg'}
    ]
    return (
      <div>
        <section id={style.left}>
          <Aside/>
        </section>
        <div className="container">
        <div className={style.pageContent}>
          <section id={style.main}>
            <div className={style.dashboardContainer}>
            
              <Form id={style.createParcel} onSubmit = {this.handleSubmit}>
                  <fieldset>
                    <legend><h2>Create Parcel Delivery Order <i className="fa fa-edit"></i></h2></legend>
                    <div id="message"></div>
                  <div className={style.formLeft}>
          
                  <Form.Group >
                    <Form.Label><strong>Receiver Phone</strong></Form.Label>
                    <Form.Control 
                      type="tel"
                      placeholder="Enter contact phone number"
                      id="receiver_number"
                      value = {receiver_number}
                      onChange={this.handleChange}
                      required
                    />
                    </Form.Group>
                    <Form.Group >
                      <Form.Label><strong>Parcel Weight</strong></Form.Label>
                      <Form.Control 
                        type="number"
                        placeholder="Item weight"
                        id="weight"
                        value = {weight}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group >
                      <Form.Label><strong>Weight Metric</strong></Form.Label>
                      <Form.Control as="select" name="metric" required id="weight_metric" onChange={this.handleChange}>
                        <option value="kg">KG</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group >
                      <Form.Label><strong>Description</strong></Form.Label>
                      <Form.Control 
                        as="textarea" rows="1"
                        text="description"
                        placeholder="description"
                        id="description"
                        value = {description}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                  </div>
                        
                  <div className={style.formLeft}>
                    <Form.Group >
                    <Form.Label><strong>Sender Address</strong></Form.Label>
                    <Form.Control 
                      type="text"
                      placeholder="Enter sender address"
                      id="sender_address"
                      value = {sender_address}
                      onChange={this.handleChange}
                      required
                    />
                    </Form.Group>

                    <Form.Group >
                      <Form.Label><strong>Receiver Address</strong></Form.Label>
                      <Form.Control 
                        type="text"
                        placeholder="Enter Destination Address"
                        id="receiver_address"
                        value = {receiver_address}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group >
                      <Form.Label><strong>Zip Code </strong></Form.Label>
                      <Form.Control 
                        type="number"
                        placeholder="zip code"
                        id="zip"
                        value = {zip}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group >
                      <Form.Label><strong>Destination State </strong></Form.Label>
                      <Form.Control 
                        type="text"
                        placeholder="Enter Destination State"
                        id="state"
                        value = {state}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                        
                  </div>
                    
                  <div >
                      <button  type="submit" className={`btn ${style.createButton}`}> Create order</button>
                  </div>        
                  
                  </fieldset>   
                      
                </Form>
              
            </div>
          </section>
        </div>
        </div>
        
      </div>
    );
  }
} 
export default connect(null, { createParcel })(withRouter(CreateParcel));