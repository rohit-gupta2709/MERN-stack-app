import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Button, Col, InputGroup } from 'react-bootstrap'

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'EMPIRE STATE BUILDING',
        description: 'One of the most famaous sky scrapers in the world',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 W 34th St, New York, Ny 10001',
        coordinates: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creatorId: 'u1'
    },
    {
        id: 'p2',
        title: 'EMPIRE STATE BUILDING',
        description: 'One of the most famaous sky scrapers in the world',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 W 34th St, New York, Ny 10001',
        coordinates: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creatorId: 'u2'
    }
]

const UpdatePlace = () => {

    const placeId = useParams().placeId

    const placeArray = DUMMY_PLACES.filter(p => p.id === placeId)

    const place = placeArray[0]

    const [validated, setValidated] = useState(false);

    const [title, setTitle] = useState(place.title);
    const [description, setDescription] = useState(place.description);
    const [image, setImage] = useState(place.image);
    const [address, setAddress] = useState(place.address);


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        event.preventDefault();
        const Data = {
            newtitle: title,
            newdescription: description,
            newimage: image,
            newaddress: address
        }
        console.log(Data)
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
            <Form className="container" noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            // placeholder="Title"
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
                            // placeholder="Description"
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
            </Form>
        </div>
    )
}

export default UpdatePlace
