import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Button, Col, InputGroup } from 'react-bootstrap'
import { useHttpHook } from '../../Components/Hooks/HttpHook'
import Loader from '../../Components/UIElements/Loader'
import ErrorModal from '../../Components/UIElements/ErrorModal'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

const UpdatePlace = () => {

    const auth = useContext(AuthContext)
    const placeId = useParams().placeId
    const [place, setPlace] = useState({
        title: '',
        description: '',
        address: '',
        image: ''
    });
    const { loading, error, sendRequest, clearError } = useHttpHook()

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`)
                setPlace(responseData)
            } catch (err) { }
        }
        fetchPlace()
    }, [sendRequest, placeId])

    useEffect(() => {
        setAddress(place.address)
        setImage(place.image)
        setDescription(place.description)
        setTitle(place.title)
    }, [place])

    const [validated, setValidated] = useState(false);

    const history = useHistory()

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [address, setAddress] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
        try {
            await sendRequest(
                `http://localhost:5000/api/places/${placeId}`,
                'PATCH',
                JSON.stringify({
                    title, description, address, image,
                }),
                {
                    'Content-Type': 'application/json'
                }
            )
            history.push('/' + auth.userId + '/places')
        } catch (err) { }
    };

    const titleHandler = (event) => {
        setTitle(event.target.value)
    }
    const descriptionHandler = (event) => {
        setDescription(event.target.value)
    }
    const imageHandler = (event) => {
        setImage(event.target.value)
    }
    const addressHandler = (event) => {
        setAddress(event.target.value)
    }

    return (
        <div>
            {loading && (
                <div className="center">
                    <Loader />
                </div>
            )}
            {error && <ErrorModal message={error} changeError={clearError} />}
            {!loading && place.title !== '' &&
                (<Form className="container" noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={title}
                                onChange={titleHandler}
                            />
                            <Form.Control.Feedback type="invalid">
                                Title cannot be empty.
                        </Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                required
                                minLength="5"
                                rows="3"
                                value={description}
                                onChange={descriptionHandler}
                            />
                            <Form.Control.Feedback type="invalid">
                                Description cannot be empty.
                        </Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                            <Form.Label>Image URL</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="url"
                                    placeholder="image URL"
                                    required
                                    value={image}
                                    onChange={imageHandler}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Invalid URL
                            </Form.Control.Feedback>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Address" required value={address} onChange={addressHandler} />
                            <Form.Control.Feedback type="invalid">
                                Invalid Address
                        </Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Button type="submit">Submit form</Button>
                </Form>)}
        </div>
    )
}

export default UpdatePlace
