import React from 'react';
import { Modal, Button} from 'react-bootstrap';

function ErrorMessage(props) {
    return (
        <div>
            <Modal show={props.showError} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Erreur</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.errorMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="alert" onClick={props.handleClose}>
                        Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
)
}

export default ErrorMessage