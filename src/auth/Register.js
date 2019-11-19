import React, { Component } from 'react'
import {Form, Modal, Button, Spinner} from 'react-bootstrap'
import {userService} from './Authentification'

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            phone:"",
            pseudo: false,
            show_register_button: false,
        };
        this.State = this.props.State
      }

    closeModal = this.props.closeModal

    handleChange = (event) => {
        this.setState({
          [event.target.id]:event.target.value,
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
    }

    registerButton = () => {
        userService.login(this.state.email, this.state.password, this.props.authenticate)
        this.setState({
          show_login_button: true,
        })
      }
    
    validateForm = () => {
      return (
        this.state.email.length > 0 &&
        this.state.password.length > 0 &&
        this.state.password === this.state.confirmPassword
      );
    }

    registerButton = () => {
      this.setState({
        show_register_button: true,
      })
      userService.register(this.state.email, this.state.password, this.state.confirmPassword, this.state.pseudo, this.state.phone, this.props.authenticate)
    }
    
    render() {
        return(
            <Modal show={this.props.modal_state === this.State.REGISTER} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Inscription</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <Form.Group>
                <Form.Label>Adresse email</Form.Label>
                <Form.Control onChange={this.handleChange} id="email" type="email" />
          </Form.Group>

          <Form.Group>
                <Form.Label>Pseudo</Form.Label>
                <Form.Control onChange={this.handleChange} id="pseudo" type="pseudo" />
          </Form.Group>

          <Form.Group>
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control onChange={this.handleChange} id="password" type="password" />
          </Form.Group>

          <Form.Group>
              <Form.Label>Confirmation mot de passe</Form.Label>
              <Form.Control onChange={this.handleChange} id="confirmPassword" type="password" />
          </Form.Group>

          <Form.Group>
                <Form.Label>Téléphone</Form.Label>
                <Form.Control onChange={this.handleChange} id="phone" type="phone" />
          </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Fermer
            </Button>
            <Button variant="primary" onClick={this.registerButton} disabled = {this.state.show_register_button}>
              <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  hidden = {!this.state.show_register_button}
              />
              Valider
            </Button>
          </Modal.Footer>
        </Modal>
        )}
}

export default Register