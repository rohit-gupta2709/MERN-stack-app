import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

const ErrorModal = ({ message, changeError }) => {
    console.log(message)
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        changeError()
    }
    // const handleShow = () => setShow(true);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ERROR</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ErrorModal
