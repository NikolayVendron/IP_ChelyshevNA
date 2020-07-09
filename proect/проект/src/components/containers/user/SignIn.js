import React, {Component} from 'react';
import {connect} from "react-redux";
import {userAuth} from "../../../store/actions/authActions";
import {Button, Form} from "react-bootstrap";
import {message} from "antd";
import {Redirect} from "react-router-dom";

class SignIn extends Component {
    state = {
        email: '',
        password: '',
        errorMessage: ''
    };
    setEmail = event => {
        this.setState({email: event.target.value})
    };
    setPassword = event => {
        this.setState({password: event.target.value})
    };
    loginHandler = async event => {
        event.preventDefault();
        this.props.userAuth(
            this.state.email,
            this.state.password,
            true
        );
    };
    render() {
        return (
            <div className={'SignIn'}>
                {this.props.message !== '' ?
                    message.error(`${this.props.message}`) : null
                }
                <div className="SignIn__content">
                    <h1>Sign In</h1>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter email" onChange={this.setEmail} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" onChange={this.setPassword} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.loginHandler}>
                            Login
                        </Button>
                        {localStorage.token !== undefined ?
                            <Redirect to={'/cabinet'} /> :
                            <Redirect to={'/login'} />
                        }
                    </Form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: state.authReducer.token,
        message: state.authReducer.message
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userAuth: (email, password, isLogin) => dispatch(userAuth(email, password, isLogin))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);