import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import { AuthContext } from '../../context/authContext'

const NavigationBar = () => {
    const auth = useContext(AuthContext)
    return (
        <Navbar className="container" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand to="/">YourPlaces</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <NavLink className="nav-link" to="/" exact>ALL USERS</NavLink>
                    {auth.isLoggedIn && (<NavLink className="nav-link" to="/u1/places">MY PLACE</NavLink>)}
                    <NavLink className="nav-link" to="/places/new">ADD PLACE</NavLink>
                    {!auth.isLoggedIn && (<NavLink className="nav-link" to="/auth">AUTH</NavLink>)}
                    {auth.isLoggedIn && (<NavLink className="nav-link" onClick={auth.logout} to="/">LOGOUT</NavLink>)}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar
