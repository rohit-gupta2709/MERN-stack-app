import React from 'react'
import { Link } from 'react-router-dom'
import './PlaceItem.css'

const PlaceItem = ({ place }) => {
    return (
        <div className="card place-item">
            <img className="card-img-top" src={place.image} alt={place.title} />
            <div className="card-body">
                <h5 className="card-title">{place.title}</h5>
                <p className="card-text">{place.description}</p>
                <p className="card-text">{place.address}</p>
            </div>
            <div className="card-body">
                <Link to="#" className="card-link btn btn-warning">Edit</Link>
                <Link to="#" className="card-link btn btn-danger">Delete</Link>
            </div>
        </div>
    )
}

export default PlaceItem
