import React, { useContext } from 'react';
import { AppContext } from '../../../Service/AppContext';
import userPhoto from '../../../assets/user.png';
import '../../../Pages/SubMain/SubMain.css';
import './Delete.css';

export default function Delete() {
    const { user, chats, userList, socket, deleteChat, setDelete } = useContext(AppContext);

    const findUserName = (userIds) => {
        if (userIds.length > 0 && userList.length > 0) {
            const UId = userIds.find((id) => {
                const regEx1 = id.replace('{', '')
                const regEx2 = regEx1.replace('}', '')
                return regEx2 !== user._id
            });
            const nam = userList.find((u) => {
                const regEx1 = UId.replace('{', '')
                const regEx2 = regEx1.replace('}', '')
                return u._id === regEx2
            });
            return `${nam.firstName + ' ' + nam.lastName}`;
        }
    }

    const handleDelete = () => {
        if (deleteChat.length > 0 && user._id) {
            socket.emit("delete_chat", { _id: user._id, room_id: deleteChat });
        }
    }

    return (
        <div className='sub-main'>
            <div className='sub-main-container' style={{ flexDirection: 'column' }} >
                <div className='delete-container'>
                    <div className='delete-title'>
                        <h1>Delete chat</h1>
                    </div>
                    <p>Wich chat would you like to delete:</p>
                    <div className='delete-chats'>
                        {chats.length > 0 ? (
                            chats.map((chat) => {
                                return (
                                    <div className='chat-card' key={chat._id} onClick={() => setDelete(chat._id)} style={deleteChat ? (deleteChat === chat._id ? ({ filter: 'brightness(80%)' }) : ({ filter: 'brightness(100%)' })) : ({})}>
                                        <img src={userPhoto} alt='' />
                                        <h3>{findUserName(chat.users)}</h3>
                                    </div>
                                )

                            })) : (<h3>You don't have any chats yet</h3>)
                        }
                    </div>
                    {deleteChat ? (
                        <button onClick={() => setDelete(false)} style={{ backgroundColor: '#858585' }}>Cancel</button>
                    ) : ('')}
                    {deleteChat ? (
                        <button onClick={handleDelete}>Delete</button>
                    ) : ('')}
                </div>
            </div>
        </div>
    )
}