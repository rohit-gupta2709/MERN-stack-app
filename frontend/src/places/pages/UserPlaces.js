import React from 'react'
import { useParams } from 'react-router-dom'

import PlaceList from '../components/PlaceList'

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'EMPIRE STATE BUILDING',
        description: 'One of the most famaous sky scrapers in the world',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 W 34th St, New York, Ny 10001',
        coordinates: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creatorId: 'u1'
    },
    {
        id: 'p2',
        title: 'EMPIRE STATE BUILDING',
        description: 'One of the most famaous sky scrapers in the world',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 W 34th St, New York, Ny 10001',
        coordinates: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creatorId: 'u2'
    }
]

const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creatorId === userId)

    return (
        <PlaceList items={loadedPlaces} />
    )
}

export default UserPlaces
