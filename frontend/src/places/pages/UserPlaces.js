import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import PlaceList from '../components/PlaceList'
import { useHttpHook } from '../../Components/Hooks/HttpHook'
import Loader from '../../Components/UIElements/Loader'
import ErrorModal from '../../Components/UIElements/ErrorModal'

const UserPlaces = () => {

    const { loading, error, sendRequest, clearError } = useHttpHook()
    const [loadedPlaces, setloadedPlaces] = useState();
    const userId = useParams().userId;

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`)
                setloadedPlaces(responseData)
            } catch (err) { }
        }
        fetchPlaces()
    }, [sendRequest, userId])

    const deletePlaceHandler = (id) => {
        console.log(id)
        setloadedPlaces(prevplaces => prevplaces.filter(p => p._id !== id))
    }

    return (
        <>
            {loading && (
                <div className="center">
                    <Loader />
                </div>
            )}
            {error && <ErrorModal message={error} changeError={clearError} />}
            {!loading && loadedPlaces && <PlaceList items={loadedPlaces} deletePlace={deletePlaceHandler} />}
        </>
    )
}

export default UserPlaces
