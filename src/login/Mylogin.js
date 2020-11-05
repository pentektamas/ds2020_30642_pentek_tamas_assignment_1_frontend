import React from 'react';
import BackgroundImg from '../commons/images/future-medicine.jpg';
import {Container, Jumbotron} from 'reactstrap';
import {Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import "./login.css";
import * as API_LOGIN from "./api/login-api";
import {withRouter} from "react-router-dom";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "800px",
    backgroundImage: `url(${BackgroundImg})`
};

const loginBackgroundStyle = {
    width: '700px',
    margin: '0 auto',
    height: "350px",
    background: 'rgba(0,0,0,0.4)'
};

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.usernameValue = this.props.usernameValue;
        this.state = {
            username: "",
            password: "",
        }
        this.handleLogin = this.handleLogin.bind(this);
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    registerLogin(account) {
        return API_LOGIN.postLogin(account, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                if (result.accountType === 'PATIENT') {
                    this.props.history.push({
                        pathname: '/patient',
                        state: {currentID: result.id}
                    });
                }

                if (result.accountType === 'CAREGIVER') {
                    this.props.history.push({
                        pathname: '/caregiver',
                        state: {currentID: result.id}
                    });
                }

                if (result.accountType === 'DOCTOR') {
                    this.props.history.push({
                        pathname: '/doctor',
                        state: {currentID: result.id}
                    });
                }

            } else {
                alert("Invalid credentials");
            }
        });
    }

    handleLogin = event => {
        event.preventDefault();
        let account = {
            userName: this.state.username,
            password: this.state.password,
        }
        this.registerLogin(account);
    }

    render() {

        return (
            <div>
                <Jumbotron fluid style={backgroundStyle}>
                    <Container fluid>
                        <h4 className="display-4" style={{color: '#ffffff'}} align={'center'}>Integrated Medical
                            Monitoring
                            Platform for Home-care
                            assistance</h4>
                        <div className="Login" style={loginBackgroundStyle} align={'center'}>
                            <form align={'center'}>
                                <FormGroup controlId="username">
                                    <FormLabel style={{color: '#ffffff'}}>Username </FormLabel>
                                    <FormControl
                                        type="username"
                                        onChange={e => this.setState({username: e.target.value})}
                                    />
                                </FormGroup>
                                <FormGroup controlId="password">
                                    <FormLabel style={{color: '#ffffff'}}>Password</FormLabel>
                                    <FormControl
                                        type="password"
                                        onChange={e => this.setState({password: e.target.value})}
                                    />
                                </FormGroup>
                                <Button
                                    onClick={this.handleLogin}
                                    disabled={!this.validateForm()}
                                    type="submit"
                                    style={{backgroundColor: '#000000', color: '#ffffff'}}>
                                    Login
                                </Button>

                            </form>
                        </div>
                    </Container>
                </Jumbotron>
            </div>
        )
    };
}

export default withRouter(Login)
