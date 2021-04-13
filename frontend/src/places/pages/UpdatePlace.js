import React from 'react'
import { useParams } from 'react-router-dom'

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

const UpdatePlace = () => {

    const placeId = useParams().placeId

    const place = DUMMY_PLACES.filter(p => p.id === placeId)

    return (
        <div>

        </div>
    )
}

export default UpdatePlace
