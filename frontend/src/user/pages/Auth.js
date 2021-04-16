import React, { useState, useContext } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

const Auth = () => {
    const auth = useContext(AuthContext)
    const [validated, setValidated] = useState(false);

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            auth.login()
        }
        console.log(email)
        console.log(password)
        event.preventDefault();
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
