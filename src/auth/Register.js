import React, { Component } from 'react'
import ReactBootstrap, {Navbar, Form, Nav, Modal, Button, Spinner} from 'react-bootstrap'
import {userService} from './Authentification'

class Register extends Component {

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
        userService.login(this.state.email, this.state.password, this.props.authenticate)
        this.setState({
          show_login_button: true,
        })
      }
    
    render() {
        return(
            <Modal show={this.props.modal_state == this.State.REGISTER} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Inscription</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <Form.Group controlId="formBasicEmail">
                <Form.Label>Adresse email</Form.Label>
                <Form.Control onChange={this.handleChange} type="email" />
          </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.closeModal}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        )}
}

export default Register