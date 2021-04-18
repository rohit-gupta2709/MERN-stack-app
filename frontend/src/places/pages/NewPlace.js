import React, { useState, useContext, useEffect } from 'react'
import { Form, Button, Col, InputGroup } from 'react-bootstrap'
import { Redirect } from 'react-router'
import { AuthContext } from '../../context/authContext'
import { useHttpHook } from '../../Components/Hooks/HttpHook'
import Loader from '../../Components/UIElements/Loader'
import ErrorModal from '../../Components/UIElements/ErrorModal'
import { useHistory } from 'react-router-dom'

const NewPlace = () => {
    const auth = useContext(AuthContext)
    const [validated, setValidated] = useState(false);

    const history = useHistory()

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [files, setFiles] = useState();
    const [previewUrl, setpreviewUrl] = useState();


    useEffect(() => {
        if (!files) {
            setpreviewUrl(null)
            return
        }
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setpreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(files)
    }, [files])

    const { loading, error, sendRequest, clearError } = useHttpHook()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
        try {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('description', description)
            formData.append('address', address)
            formData.append('image', files)
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL + '/places',
                'POST',
                formData,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            )
            history.push('/')
        } catch (err) { }
    };

    const titleHandler = (event) => {
        setTitle(event.target.value)
    }
    const descriptionHandler = (event) => {
        setDescription(event.target.value)
    }
    const imageHandler = (event) => {
        setFiles(event.target.files[0])
    }
    const addressHandler = (event) => {
        setAddress(event.target.value)
    }

    return (
        <>
            {!auth.isLoggedIn && (<Redirect to="/auth" />)}
            {loading && <Loader />}
            {error && <ErrorModal message={error} changeError={clearError} />}
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
                        <Form.Label>Image</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="file"
                                placeholder="CHOOSE IMAGE"
                                required
                                name='image'
                                onChange={imageHandler}
                                accept=".jpg,.jpeg,.png"
                            />
                            <Form.Control.Feedback type="invalid">
                                Invalid image types
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    {previewUrl && (<img src={previewUrl} alt="file" />)}
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
                <Button type="submit">Submit form</Button>
            </Form>
        </>
    )
}

export default NewPlace
