import React, { useEffect, useState } from 'react'
import UserList from '../components/UserList'
import Loader from '../../Components/UIElements/Loader'
import ErrorModal from '../../Components/UIElements/ErrorModal'
import { useHttpHook } from '../../Components/Hooks/HttpHook'

const Users = () => {

    const [loadedUsers, setloadedUsers] = useState()
    const { loading, error, sendRequest, clearError } = useHttpHook()


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest('http://localhost:5000/api/users')
                setloadedUsers(responseData)
            } catch (err) { }
        }
        fetchUsers()
    }, [sendRequest])

    return (
        <>
            {loading && (
                <div className="center">
                    <Loader />
                </div>)}
            {error && <ErrorModal message={error} changeError={clearError} />}
            {!loading && loadedUsers && (<UserList items={loadedUsers} />)}
        </>
    )
}

export default Users
