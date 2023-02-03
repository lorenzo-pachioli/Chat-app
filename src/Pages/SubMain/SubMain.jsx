import React from 'react';
import Chat from '../../Components/SubMain/Chat/Chat';
import UserList from '../../Components/SubMain/UsersList/UserList';
import './SubMain.css';

export default function SubMain() {

    return (
        <div className='sub-main'>
            <div className='sub-main-container'>
                <UserList />
                <Chat />
            </div>
        </div>
    )
}
