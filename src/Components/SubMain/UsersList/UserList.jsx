import React, { useContext } from 'react';
import { AppContext } from '../../../Service/AppContext';
import userPhoto from '../../../assets/user.png';
import UserCard from './UserCard/UserCard';
import './UserList.css';

export default function UserList() {

    const { user, chats, userList, newChat, setNewChat, socket } = useContext(AppContext);

    const findiD = (users) => {
        const id = users.find(id => id !== user._id.toString())
        return id;
    };

    const findUserOnline = (id) => {
        if (userList.length > 0) {
            const UID = userList.find(u => u._id.toString() === id)
            return UID ? UID.online : id;
        }
    };

    return (
        <div className='user-list'>
            <div className='sub-user-list' >
                {user ? (
                    <UserCard id={user._id} status={user.online ? ('online') : ('offline')} online={socket.connected} img={userPhoto} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className='open-chats'>
                {newChat ? (
                    userList.length > 0 ? (
                        userList.map((u) => {
                            return u._id === user._id ? (false) : (<UserCard key={u._id} id={u._id} img={u.img} online={u.online} />)
                        })
                    ) : ('')

                ) : (
                    chats.length > 0 ? (
                        chats.map((u) => {
                            return (
                                <UserCard key={u._id} id={findiD(u.users)} online={socket.connected ? (findUserOnline(findiD(u.users))) : (false)} chatId={u._id} img={u.img} />
                            )
                        })
                    ) : ('')
                )}
            </div>
            <div className='new-chat' >
                <button onClick={() => setNewChat(!newChat)}>{newChat ? ('Back') : ('New chat')}</button>
            </div>
        </div>
    )
}
