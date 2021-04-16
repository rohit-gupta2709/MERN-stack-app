import React from 'react'
import './PlaceList.css'
import Card from '../../Components/UIElements/Card'
import PlaceItem from './PlaceItem'
import { Link } from 'react-router-dom'

const PlaceList = ({ items, deletePlace }) => {

    if (items.length === 0) {
        return (
            <div className="place-list center">
                <Card>
                    <h2>No place found. Maybe create One? </h2>
                    <Link className="btn btn-primary" to="/places/new">Share Place</Link>
                </Card>
            </div>
        )
    }

    return (
        <ul className="place-list">
            <div className="card-group">
                {items.map(place =>
                    <PlaceItem
                        key={place._id}
                        place={place}
                        deletePlace={deletePlace}
                    />)}
            </div>
        </ul>
    )
}

export default PlaceList
