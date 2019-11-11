import React, { Component } from 'react'
import {Form, Modal, Button, Spinner} from 'react-bootstrap'
import {userService} from '../auth/Authentification'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal_state : this.props.modal_state,
            email: null,
            password: null,
            remember: false,
            show_login_button: false,
        };
        this.State = this.props.State
      }

    closeModal = this.props.closeModal

    handleChange = (event) => {
        this.setState({
          [event.target.type]:event.target.value,
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
    }
    
    handleCheckbox = (event) => {
        this.setState({
          remember : event.target.checked,
        })
    }

    loginButton = () => {
        this.setState({
            show_login_button: true,
        })
        userService.login(this.state.email, this.state.password, this.props.authenticate)
      }
    
    render() {
        return(
            <Modal show={this.props.modal_state === this.State.LOGIN} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Pseudo</Form.Label>
                        <Form.Control onChange={this.handleChange} type="email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control onChange={this.handleChange} type="password" />
                    </Form.Group>
                    {/*
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check onChange={this.handleCheckbox} type="checkbox" label="Se rappeler de moi" />
                    </Form.Group>
                    */}
                    <p style={{cursor: "pointer", color: "blue"}} onClick={this.props.showForgot}>J'ai oublié mon mot de passe</p>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeModal}>
                    Fermer
                    </Button>
                    <Button variant="primary" onClick={this.loginButton} disabled = {this.state.show_login_button}>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        hidden = {!this.state.show_login_button}
                    />
                    Valider
                    </Button>
                </Modal.Footer>
            </Modal>
        )}
}

export default Login