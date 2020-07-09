import React, {Component} from 'react';
import {Button, message} from 'antd';
import {Form, Modal, Col, Table} from "react-bootstrap";
import axios from 'axios';
import AdminPanelItem from "./AdminPanelItem";
import {connect} from "react-redux";
import {renderItems} from "../../../store/actions/mainActions";

class AdminPanel extends Component {

    state = {
        showAdd: false,
        name: '',
        type: 'Window',
        material: 'Glass',
        count: '',
        price: '',
        items: []
    };

    componentDidMount() {
        this.props.renderItems()
    }

    onAddItem = () => {
      this.setState({showAdd: true})
    };

    closeAddItem = () => {
        this.setState({showAdd: false})
    };

    changeAddName = event => {
        this.setState({name: event.target.value});
    };
    changeAddType = event => {
        this.setState({type: event.target.value});
    };
    changeAddMaterial = event => {
        this.setState({material: event.target.value});
    };
    changeAddCount = event => {
        this.setState({count: event.target.value});
    };
    changeAddPrice = event => {
        this.setState({price: event.target.value});
    };

    sendAddData = async () => {
        try  {
            await axios.post('https://furniture-shop-71b70.firebaseio.com/furniture.json', {
                name: this.state.name,
                type: this.state.type,
                material: this.state.material,
                count: this.state.count,
                price: this.state.price
            });
            this.setState({showAdd: false});
            message.success('Item was successfully add');
            this.props.renderItems();
        } catch (e) {
            console.log(e)
        }
    };

    render() {
        const validator = (this.state.name === '') ||
            (this.state.type === '') ||
            (this.state.material === '') ||
            (this.state.count === '') ||
            (this.state.price === '');
        return (
            <div className="AdminPanel">
                <Modal show={this.state.showAdd} onHide={this.closeAddItem}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type={'text'} placeholder={'Enter name'} onChange={this.changeAddName} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control as="select" value={this.state.type} onChange={this.changeAddType}>
                                        <option value={'Window'}>Window</option>
                                        <option value={'Sofa'}>Sofa</option>
                                        <option value={'Chair'}>Chair</option>
                                        <option value={'Table'}>Table</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Group>
                                <Form.Label>Processing</Form.Label>
                                <Form.Control as="select" defaultValue={'Glass'} onChange={this.changeAddMaterial}>
                                    <option value={'Glass'}>Glass</option>
                                    <option value={'Wood'}>Wood</option>
                                    <option value={'Steal'}>Steal</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Count</Form.Label>
                                    <Form.Control type={'number'} placeholder={'Enter count'} onChange={this.changeAddCount} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Price $</Form.Label>
                                    <Form.Control type={'number'} placeholder={'Enter price'} onChange={this.changeAddPrice} />
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeAddItem}>
                            Close
                        </Button>
                        {validator ?
                            <Button variant="primary" disabled>
                                Add new item
                            </Button> :
                            <Button variant="primary" onClick={this.sendAddData}>
                                Add new item
                            </Button>
                        }
                    </Modal.Footer>
                </Modal>

                <div className="AdminPanel__header">
                    <p>Admin panel</p>
                    <Button type={'primary'} onClick={this.onAddItem}>Add new</Button>
                </div>
                <div className="AdminPanel__content">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Material</th>
                            <th>Count</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.items.map((item, index) => {
                            return (
                                <AdminPanelItem
                                    key={item+index}
                                    id={item.key}
                                    name={item.name}
                                    type={item.type}
                                    material={item.material}
                                    count={item.count}
                                    price={item.price}
                                />
                            )
                        })}
                        </tbody>
                    </Table>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);