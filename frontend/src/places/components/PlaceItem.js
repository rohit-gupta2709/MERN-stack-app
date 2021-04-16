import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import './PlaceItem.css'
import { Button, Modal } from 'react-bootstrap'
import { AuthContext } from '../../context/authContext'
import { useHttpHook } from '../../Components/Hooks/HttpHook'
import Loader from '../../Components/UIElements/Loader'
import ErrorModal from '../../Components/UIElements/ErrorModal'
// import { useHistory } from 'react-router-dom'

const PlaceItem = ({ place, deletePlace }) => {

    const auth = useContext(AuthContext)

    // const history = useHistory()

    const [show, setShow] = useState(false);

    const { loading, error, sendRequest, clearError } = useHttpHook()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const deleteHandler = async () => {
        setShow(false)
        try {
            await sendRequest(
                `http://localhost:5000/api/places/${place._id}`,
                'DELETE'
            )
            deletePlace(place._id)
            // history.replace('/' + auth.userId + '/places')
        } catch (err) { }

    }
    return (
        <>
            {loading && (
                <div className="center">
                    <Loader />
                </div>
            )}
            {error && <ErrorModal message={error} changeError={clearError} />}
            <div className="card place-item">
                <img className="card-img-top" src={place.image} alt={place.title} />
                <div className="card-body">
                    <h5 className="card-title">{place.title}</h5>
                    <p className="card-text">{place.description}</p>
                    <p className="card-text">{place.address}</p>
                </div>
                <div className="card-body">
                    {auth.isLoggedIn && auth.userId === place.creator && (<Link to={`/places/${place._id}`} className="card-link btn btn-warning">Edit</Link>)}
                    {auth.isLoggedIn && auth.userId === place.creator && (<Button className="card-link" variant="danger" onClick={handleShow}>Delete</Button>)}
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
        </>
    )
}

export default PlaceItem
