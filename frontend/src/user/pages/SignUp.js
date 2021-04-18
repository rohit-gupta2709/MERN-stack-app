import React, { useContext, useState, useEffect } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import Loader from "../../Components/UIElements/Loader";
import ErrorModal from "../../Components/UIElements/ErrorModal";
import { useHttpHook } from '../../Components/Hooks/HttpHook'

const SignUp = ({ redirect = '/' }) => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const [validated, setValidated] = useState(false);

    const { loading, error, sendRequest, clearError } = useHttpHook()

    useEffect(() => {
        if (auth.isLoggedIn) {
            history.push(redirect)
        }
    }, [history, auth.isLoggedIn, redirect])

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [name, setname] = useState('');
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            try {
                const formData = new FormData()
                formData.append('email', email)
                formData.append('password', password)
                formData.append('name', name)
                formData.append('image', files)
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + '/users/signup',
                    'POST',
                    formData
                )
                auth.login(responseData.userId, responseData.token)
                history.push('/')
            } catch (err) { }
        }
        setValidated(true);
    };

    const emailHandler = (event) => {
        setemail(event.target.value)
    }
    const passwordHandler = (event) => {
        setpassword(event.target.value)
    }
    const nameHandler = (event) => {
        setname(event.target.value)
    }
    const imageHandler = (event) => {
        setFiles(event.target.files[0])
    }

    return (
        <>
            {loading && <Loader />}
            {error && <ErrorModal message={error} changeError={clearError} />}
            <Form noValidate validated={validated} className="container" onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" required onChange={nameHandler} />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid name.
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Username/Email"
                            onChange={emailHandler}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Email/Username.
                    </Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required onChange={passwordHandler} />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid password.
                    </Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Image</Form.Label>
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
                    </Form.Group>
                    {previewUrl && (<img src={previewUrl} alt="file" />)}
                </Form.Row>
                <Button type="submit">Sign Up</Button>
            </Form>
            <Link to="/auth" >Login</Link>
        </>
    )
}

export default SignUp
