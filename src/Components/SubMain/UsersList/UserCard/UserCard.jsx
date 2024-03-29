import React, { useContext } from 'react';
import { AppContext } from '../../../../Service/AppContext';
import userPhoto from '../../../../assets/user.png'
import UnReadDot from '../../../../utils/UnReadDot/UnReadDot';
import './UserCard.css';

export default function UserCard({ id, img, online, chatId, photo }) {

    const { user, room, setRoom, chats, userList, newChat, setNewChat, unReadNum, socket } = useContext(AppContext);
    const borderNewChat = {
        border: '2px solid #858585'
    };

    const name = () => {
        const regEx1 = id.replace('{', '')
        const regEx2 = regEx1.replace('}', '')
        const nam = userList.find((u) => u._id === regEx2);
        return `${nam.firstName + ' ' + nam.lastName}`;
    };

    const handleMessages = async () => {

        if (newChat) {
            socket.emit("init_room", { otherUser: id, _id: user._id })
            return setNewChat(false);
        }
        if (id !== user._id) {
            setRoom(chats.find(chat => chat._id === chatId))
            socket.emit("read_msg", { _id: user._id, room_id: chatId })
        }
        socket.emit('log_user')
    };

    const UnRead = () => {
        if (id === user._id || unReadNum.length === 0) {
            return <UnReadDot unReadNumber={0} />
        }
        const unread = unReadNum.find((chat) => chat.chatId === chatId);
        if (unread) {
            if (unread.chatId === room._id) {
                return <UnReadDot unReadNumber={0} />
            }
            if (unread.unRead.length > 0) {
                return <UnReadDot unReadNumber={unread.unRead.length} />
            }
        }
    };

    return (
        <div className='userCard' id={id !== user._id ? ('otherUser') : ('user')} onClick={handleMessages} style={newChat && id !== user._id ? (borderNewChat) : ({})} >
            <div className='sub-userCard'>
                <div className='profile-img'>
                    {photo ? (
                        <img src={photo} className='profile-pic' alt='' />

                    ) : (
                        <img src={userPhoto} className='profile-pic' alt='' />
                    )
                    }
                    <span className='dot' style={{ 'backgroundColor': `${online ? ('#2e7d32') : ('darkGrey')}` }} />
                </div>
                <div className='name'>
                    {userList ? (userList.length > 0 ? (name()) : ('Loading...')) : ('Loading...')}
                </div>
            </div>
            <div className='msj-number'>
                <UnRead />
            </div>
        </div>
    )
}
