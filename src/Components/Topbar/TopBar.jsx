import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../Service/AppContext';
import userPhoto from '../../assets/user.png';
import bell from '../../assets/bell.svg';
import Message from '../SubMain/Chat/Message/Message';
import { Link } from 'react-router-dom';
import UnReadDot from '../../utils/UnReadDot/UnReadDot';
import './TopBar.css';

export default function TopBar() {

    const { user, chats, unReadNum, setRoom, socket } = useContext(AppContext);
    const [unreadList, setUnreadList] = useState([]);
    const [showList, setShowList] = useState(false);

    const handleSetRoom = (id, chatId) => {
        if (id !== user._id) {
            setRoom(chats.find(chat => chat._id === chatId))
            socket.emit("read_msg", { _id: user._id, room_id: chatId })
        }
    }

    useEffect(() => {
        const msj = unReadNum.map(chat => chat.unRead);
        const totalMsj = msj.flat(1);
        setUnreadList(totalMsj);
    }, [unReadNum]);

    return (
        <div className='top-bar'>
            <div className='top-bar-title'>
                <h2>Pachioli Chat</h2>
            </div>
            <div className='user'>
                <div>
                    {user ? (
                        user.img ? (
                            <img src={user.img} className='profile-pic' alt='' />
                        ) : (
                            <img src={userPhoto} className='profile-pic' alt='' />
                        )
                    ) : (
                        <img src={userPhoto} className='profile-pic' alt='' />
                    )
                    }
                    <p>{user ? (`${user.firstName + ' ' + user.lastName}`) : ('no user')}</p>
                </div>
                <button onClick={() => setShowList(unReadNum.length > 0 ? !showList : showList)}>
                    <img src={bell} alt='' />
                    <UnReadDot unReadNumber={unreadList.length} />
                    {showList && unreadList.length > 0 ? (
                        <div className='unRead-msg'>
                            <div className='sub-unRead-msg'>
                                {unreadList.map(msj => {
                                    return msj._id ? (
                                        <Link to='/chatapp' className='link' key={msj._id} onClick={() => handleSetRoom(msj.user, msj.room)}>
                                            <Message user={user} id={msj._id} date={msj.time} content={msj.message} postedBy={msj.user} />
                                        </Link>
                                    ) : ('')
                                })}
                            </div>

                        </div>
                    ) : ('')}
                </button>
            </div>
        </div>
    )
}
