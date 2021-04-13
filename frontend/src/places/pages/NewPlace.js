import React, { useState } from 'react'
import { Form, Button, Col, InputGroup } from 'react-bootstrap'

const NewPlace = () => {

    const [validated, setValidated] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [address, setAddress] = useState('');


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
                            placeholder="Title"
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
                            placeholder="Description"
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
                        <Form.Control type="text" placeholder="Address" required onChange={addressHandler} />
                        <Form.Control.Feedback type="invalid">
                            Invalid Address
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                {/* <Form.Group>
                    <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                    />
                </Form.Group> */}
                <Button type="submit">Submit form</Button>
            </Form>
        </div>
    )
}

export default NewPlace
