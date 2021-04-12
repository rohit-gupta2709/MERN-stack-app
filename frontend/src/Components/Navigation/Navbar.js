import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">YourPlaces</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item ">
                                <NavLink className="nav-link active" aria-current="page" to="/" exact>ALL USERS</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/1/places">MY PLACE</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/places/new">ADD PLACE</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/auth">LOGIN/SIGN UP</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
