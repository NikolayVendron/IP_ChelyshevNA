import React, {Component} from 'react';
import axios from 'axios';
import {Button, message} from "antd";
import {Col, Form, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {renderItems} from "../../../store/actions/mainActions";

class AdminPanelItem extends Component {

    state = {
        showEdit: false,
        name: '',
        type: '',
        material: '',
        count: '',
        price: '',
        items: []
    };

    deleteHandler = async event => {
        event.preventDefault();
        try {
            await axios.delete(`https://furniture-shop-71b70.firebaseio.com/furniture/${this.props.id}.json`);
            this.props.renderItems();
            message.success('Item was successfully deleted');
        } catch (e) {
            console.log(e)
        }
    };

    showHandlerModal = () => {
        this.setState({showEdit: true})
    };

    closeEditItem = () => {
        this.setState({showEdit: false})
    };

    changeEditName = event => {
        this.setState({name: event.target.value});
    };
    changeEditType = event => {
        this.setState({type: event.target.value});
    };
    changeEditMaterial = event => {
        this.setState({material: event.target.value});
    };
    changeEditCount = event => {
        this.setState({count: event.target.value});
    };
    changeEditPrice = event => {
        this.setState({price: event.target.value});
    };

    sendEditData = async () => {
        try  {
            await axios.put(`https://furniture-shop-71b70.firebaseio.com/furniture/${this.props.id}.json`, {
                name: this.state.name || this.props.name,
                type: this.state.type || this.props.type,
                material: this.state.material || this.props.material,
                count: this.state.count || this.props.count,
                price: this.state.price || this.props.price
            });
            this.setState({showEdit: false});
            this.props.renderItems();
            message.success('Item was successfully edited');
        } catch (e) {
            console.log(e)
        }
    };

    render() {
        const item = this.props;
        return (
            <>
                <Modal show={this.state.showEdit} onHide={this.closeEditItem}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit current item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type={'text'} placeholder={'Enter name'} defaultValue={item.name} onChange={this.changeEditName} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control as="select" defaultValue={item.type} onChange={this.changeEditType}>
                                        <option value={'Window'}>Window</option>
                                        <option value={'Sofa'}>Sofa</option>
                                        <option value={'Chair'}>Chair</option>
                                        <option value={'Table'}>Table</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Group>
                                <Form.Label>Processing</Form.Label>
                                <Form.Control as="select" defaultValue={item.material} onChange={this.changeEditMaterial}>
                                    <option value={'Glass'}>Glass</option>
                                    <option value={'Wood'}>Wood</option>
                                    <option value={'Steal'}>Steal</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Count</Form.Label>
                                    <Form.Control type={'number'} placeholder={'Enter count'} defaultValue={item.count} onChange={this.changeEditCount} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Price $</Form.Label>
                                    <Form.Control type={'number'} placeholder={'Enter price'} defaultValue={item.price} onChange={this.changeEditPrice} />
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeEditItem}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.sendEditData}>
                            Edit new item
                        </Button>
                    </Modal.Footer>
                </Modal>
                <tr>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td>{item.material}</td>
                    <td>{item.count}</td>
                    <td>{item.price}</td>
                    <td>
                        <Button variant={'primary'} onClick={this.deleteHandler}><i className={'fa fa-trash'} /></Button>
                        <Button variant={'primary'} onClick={this.showHandlerModal}><i className={'fa fa-pen'} /></Button>
                    </td>
                </tr>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        items: state.mainReducer.items
    }
}

function mapDispatchToProps(dispatch) {
    return {
        renderItems: () => dispatch(renderItems())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanelItem);