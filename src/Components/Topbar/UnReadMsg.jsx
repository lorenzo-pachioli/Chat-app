import React, { useContext } from 'react';
import { AppContext } from '../../Service/AppContext';
import Message from '../SubMain/Chat/Message/Message';
import { Link } from 'react-router-dom';

export default function UnReadMsgs({ unreadList }) {

  const { user, chats, setRoom, socket } = useContext(AppContext);

  const handleSetRoom = (id, chatId) => {
    if (id !== user._id) {
      setRoom(chats.find(chat => chat._id === chatId));
      socket.emit("read_msg", { _id: user._id, room_id: chatId });
    }
  }

  return (
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
  )
}
