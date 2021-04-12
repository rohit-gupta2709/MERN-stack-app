import React from 'react'
import './UserList.css'
import UserItem from './UserItem'
import Card from '../../Components/UIElements/Card'

const UserList = ({ items }) => {

    if (items.length === 0) {
        return <div className="center">
            <Card>
                <h2>No users found.</h2>
            </Card>
        </div>
    }

    return (
        <div>
            <ul className="users-list">
                {items.map(user =>
                    <UserItem
                        key={user.id}
                        user={user}
                    />
                )}
            </ul>
        </div>

    )
}

export default UserList
