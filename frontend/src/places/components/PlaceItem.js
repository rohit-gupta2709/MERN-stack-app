import React from 'react'
import Card from '../../Components/UIElements/Card'
import './PlaceItem.css'

const PlaceItem = ({ place }) => {
    // console.log(place)
    return (
        <li className="place-item">
            <Card className="place-item__content">
                <div className="place-item__image">
                    <img src={place.image} alt={place.title} />
                    <div className="place-item__info bg-primary">
                        <h2>{place.title}</h2>
                        <h3>{place.address}</h3>
                        <p>{place.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <button>VIEW ON MAP</button>
                        <button>EDIT</button>
                        <button>DELETE</button>
                    </div>
                </div>
            </Card>
        </li>
    )
}

export default PlaceItem
