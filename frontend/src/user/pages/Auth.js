import React, { useState, useContext, useEffect } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import Loader from "../../Components/UIElements/Loader";
import ErrorModal from "../../Components/UIElements/ErrorModal";
import { useHttpHook } from '../../Components/Hooks/HttpHook'

const Auth = ({ redirect = '/', history }) => {
    const auth = useContext(AuthContext)
    const [validated, setValidated] = useState(false);

    const { loading, error, sendRequest, clearError } = useHttpHook()

    useEffect(() => {
        if (auth.isLoggedIn) {
            history.push(redirect)
        }
    }, [history, auth.isLoggedIn, redirect])

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users/login',
                    'POST',
                    JSON.stringify({
                        email, password
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                )
                auth.login(responseData.userId, responseData.token)
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

    return (
        <>
            {loading && <Loader />}
            {error && <ErrorModal message={error} changeError={clearError} />}
            <Form noValidate validated={validated} className="container" onSubmit={handleSubmit}>
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
                <Button type="submit">Sign In</Button>
            </Form>
            <Link to="/auth/signup" >Sign Up</Link>
        </>
    )
}

export default Auth
