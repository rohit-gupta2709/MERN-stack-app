import React from 'react'
import './PlaceList.css'
// import { Link } from 'react-router-dom'
import Card from '../../Components/UIElements/Card'
import PlaceItem from './PlaceItem'

const PlaceList = ({ items }) => {

    if (items.length === 0) {
        return (
            <div className="place-list center">
                <Card>
                    <h2>No place found. Maybe create One? </h2>
                    <button>Share Place</button>
                </Card>
            </div>
        )
    }

    return (
        <ul className="place-list">
            {items.map(place =>
                <PlaceItem
                    key={place.id}
                    place={place}
                />)}
        </ul>
    )
}

export default PlaceList
