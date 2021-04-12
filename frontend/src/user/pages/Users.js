import React from 'react'
import UserList from '../components/UserList'

const Users = () => {

    const USERS = [
        {
            id: '1',
            name: 'Rohit',
            image: 'https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg',
            placeCount: 3
        }
    ]

    return (
        <UserList items={USERS} />
    )
}

export default Users
