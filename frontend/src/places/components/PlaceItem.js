import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './PlaceItem.css'
import { Button, Modal } from 'react-bootstrap'

const PlaceItem = ({ place }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const deleteHandler = () => {
        setShow(false)
        console.log('deleting')
    }
    return (
        <div className="card place-item">
            <img className="card-img-top" src={place.image} alt={place.title} />
            <div className="card-body">
                <h5 className="card-title">{place.title}</h5>
                <p className="card-text">{place.description}</p>
                <p className="card-text">{place.address}</p>
            </div>
            <div className="card-body">
                <Link to={`/places/${place.id}`} className="card-link btn btn-warning">Edit</Link>
                <Button className="card-link" variant="danger" onClick={handleShow}>Delete</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation required</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={deleteHandler}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default PlaceItem
