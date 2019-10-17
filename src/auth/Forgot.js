import React, { Component } from 'react'
import {Form, Modal, Button} from 'react-bootstrap'
import {userService} from './Authentification'

class Forgot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal_state : this.props.modal_state,
            email: null,
            show_forgot_button: false,
            done: false,
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
    
    handleCheckbox = (event) => {
        this.setState({
          remember : event.target.checked,
        })
    }

    forgotButton = () => {
        userService.forgot(this.state.email)
        this.setState({
          done: true,
        })
      }

    render() {
        var body = ""
        var button = ""
        if(this.state.done === false){
          body = <Form.Group>
                              <Form.Label>Veuillez entrer votre adresse email</Form.Label>
                              <Form.Control onChange={this.handleChange} id="email" type="email" />
                        </Form.Group>
          button =  <Button variant="primary" onClick={this.forgotButton} hidden={this.done}>
                      Valider
                    </Button>
        }
        else{
          body = <p>Vous allez recevoir un mail vous permettant de changer votre mot de passe</p>
          button = ""
        }
        return(
            <Modal show={this.props.modal_state === this.State.FORGOT} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>J'ai oublié mon mot de passe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {body}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeModal}>
                    Fermer
                    </Button>
                    {button}
                </Modal.Footer>
            </Modal>
        )}
}

export default Forgot