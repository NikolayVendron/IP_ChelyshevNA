import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import {Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {userAuth} from "../../../store/actions/authActions";

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        repeatedPassword: '',
        name: '',
        surname: ''
    };
    setEmail = event => {
        this.setState({email: event.target.value})
    };
    setPassword = event => {
        this.setState({password: event.target.value})
    };
    setRepeatedPassword = event => {
        this.setState({repeatedPassword: event.target.value})
    };
    setName= event => {
        this.setState({name: event.target.value})
    };
    setSurname = event => {
        this.setState({surname: event.target.value})
    };
    registerHandler = event => {
        event.preventDefault();
        this.props.userAuth(
            this.state.email,
            this.state.password,
            false,
            this.state.name,
            this.state.surname,
        );
    };
    render() {
        const validate = (this.state.password === this.state.repeatedPassword)
            && (this.state.password.length > 5)
            && (this.state.repeatedPassword.length > 5)
            && (this.state.email !== '')
            && (this.state.password !== '')
            && (this.state.repeatedPassword !== '')
            && (this.state.name !== '')
            && (this.state.surname !== '');
        return (
            <div className={'SignUp'}>
                <div className="SignUp__content">
                    <h1>Sign Up</h1>
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Control type="text" placeholder="Enter name" onChange={this.setName} />
                        </Form.Group>
                        <Form.Group controlId="surname">
                            <Form.Control type="text" placeholder="Enter surname" onChange={this.setSurname} />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Control type="email" placeholder="Enter email" onChange={this.setEmail} />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Control type="password" placeholder="Password" onChange={this.setPassword} />
                        </Form.Group>
                        <Form.Group controlId="repeatPassword">
                            <Form.Control type="password" placeholder="Repeat password" onChange={this.setRepeatedPassword} />
                        </Form.Group>
                        <small>Forgot your password?</small>
                        {this.props.isReg === true ?
                            <Redirect to={'/login'} /> :
                            <small className={'error'} style={{color: 'red', marginTop: '1rem'}}>{this.props.message}</small>
                        }
                        {validate ?
                            <Button variant="primary" type="submit" onClick={this.registerHandler}>
                                Let's go!
                            </Button> :
                            <Button variant="primary" type="submit" disabled>
                                Let's go!
                            </Button>
                        }
                    </Form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        message: state.authReducer.message,
        isReg: state.authReducer.isReg
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userAuth: (email, password, isLogin, name, surname) => dispatch(userAuth(email, password, isLogin, name, surname))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));