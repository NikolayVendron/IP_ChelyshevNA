import React, {Component} from 'react';
import {connect} from "react-redux";
import {logout} from "../../../store/actions/authActions";
import {renderData} from "../../../store/actions/mainActions";
import {Button, Form, Modal, Col} from "react-bootstrap";
import {NavLink, withRouter} from "react-router-dom";
import axios from 'axios';

class Cabinet extends Component {

    state = {
        showModal: false,
        name: '',
        surname: '',
        email: '',
        phone: '',
        address: ''
    };

    closeModal = () => {
      this.setState({showModal: false})
    };

    openModal = () => {
        this.setState({showModal: true})
    };

    editHandler = async event => {
      event.preventDefault();
      try {
          await axios.put(`https://furniture-shop-71b70.firebaseio.com/users/${localStorage.userId}/${this.props.personId}.json`, {
              name: this.state.name || this.props.personData.name,
              surname: this.state.surname || this.props.personData.surname,
              email: this.state.email || this.props.personData.email,
              phone: this.state.phone || this.props.personData.phone,
              address: this.state.address || this.props.personData.address,
          });
          this.setState({showModal: false});
          this.props.renderData();
      } catch (e) {
          console.log(e)
      }
    };

    componentDidMount() {
        this.props.renderData();
    };

    logoutHandler = () => {
      this.props.logout();
      this.props.history.push("/login");
    };

    setName = event => {
        this.setState({name: event.target.value})
    };
    setSurname = event => {
        this.setState({surname: event.target.value})
    };
    setEmail = event => {
        this.setState({email: event.target.value})
    };
    setPhone = event => {
        this.setState({phone: event.target.value})
    };
    setAddress = event => {
        this.setState({address: event.target.value})
    };

    render() {
        const validate =
            (((this.state.name === '')
                || (this.state.surname === '')
                || (this.state.email === '')
                || (this.state.phone === '')
                || (this.state.address === ''))
                && ((this.props.personData.name === '')
                    || (this.props.personData.surname === '')
                    || (this.props.personData.email === '')
                    || (this.props.personData.phone === '')
                    || (this.props.personData.address === '')));
        return (
            <div className={'Cabinet'}>

                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit person</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" defaultValue={this.props.personData.name} placeholder="Name" onChange={this.setName} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="surname">
                                    <Form.Label>Surname</Form.Label>
                                    <Form.Control type="text" defaultValue={this.props.personData.surname} placeholder="Surname" onChange={this.setSurname} />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" defaultValue={this.props.personData.email} placeholder="Email" onChange={this.setEmail} />
                            </Form.Group>

                            <Form.Group controlId="tel">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="tel" defaultValue={this.props.personData.phone} placeholder="Phone" onChange={this.setPhone} />
                            </Form.Group>

                            <Form.Group controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="email" defaultValue={this.props.personData.address} placeholder="Address" onChange={this.setAddress} />
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Close
                        </Button>
                        {validate ?
                            <Button variant="primary" disabled>Save Changes</Button> :
                            <Button variant="primary" onClick={this.editHandler}>Save Changes</Button>
                        }
                    </Modal.Footer>
                </Modal>

               <div className="Cabinet__header">
                   <h5>{this.props.personData.name + ' ' + this.props.personData.surname}</h5>
                   <Button variant={'secondary'} onClick={this.logoutHandler}>Logout</Button>
               </div>
                <div className="Cabinet__content">
                    <h3>Main info</h3>
                    <div className="Cabinet__content_info">
                        <p>Name: <b>{this.props.personData.name}</b></p>
                        <p>Surname: <b>{this.props.personData.surname}</b></p>
                        <p>Email: <b>{this.props.personData.email}</b></p>
                        <p>Phone: <b>{this.props.personData.phone || 'No data'}</b></p>
                        <p>Address: <b>{this.props.personData.address || 'No data'}</b></p>
                    </div>
                    <div className="Cabinet__content_orders">
                        <h3>Orders</h3>
                        <div className="card">
                            {this.props.orders.map((order, index) => {
                                return (
                                    <div key={order+index} className={'card-body'}>
                                        <p><b>Name: </b>{order.orderData.name}</p>
                                        <p><b>Price: </b>{order.orderData.price}</p>
                                        <p><b>Date: </b>{order.orderData.date}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <Button variant={'secondary'} onClick={this.openModal} style={{marginRight: '1rem'}}>Edit profile</Button>
                    <NavLink to={'/catalog'}><Button variant="secondary">Catalog</Button></NavLink>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        personId: state.mainReducer.personId,
        personData: state.mainReducer.personData,
        orders: state.mainReducer.orders
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout()),
        renderData: () => dispatch(renderData())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cabinet));