import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../../../Service/AppContext';
import Read from './Read/Read';
import UnRead from './Read/UnRead';
import html2canvas from 'html2canvas';
import paperPlane from '../../../assets/paper-plane.svg';
import './Chat.css';

export default function Chat() {

    const { user, room, setUrl, socket } = useContext(AppContext);
    const [sendMsj, setSendMsj] = useState('')
    const [loadingComplaint, setLoadingCompl] = useState(false)
    const [redirectComplaint, setRedirectCompl] = useState(false)
    const [rows, setRows] = useState(25)

    const handleSend = async () => {
        if (room._id) {
            try {
                await socket.emit("send_msg", {
                    message: sendMsj,
                    room: room._id,
                    _id: user._id
                })
            } catch (err) {
                console.log('error sending msg', err)
            }
        }
        setSendMsj('');
        setRows(25);
    };

    const handleComplaints = async () => {
        try {
            setLoadingCompl(true)
            const element = document.getElementById('conversationContainer')
            const canvas = await html2canvas(element);
            const image = canvas.toDataURL("image/png", 1.0);
            const receiver = await room.users.find((id) => id !== user._id);
            setUrl({
                url: image,
                receiver: receiver,
                room_id: room._id
            })
            if (image) {
                setRedirectCompl(true)
                setTimeout(() => {
                    setLoadingCompl(false)
                    setRedirectCompl(false)
                }, 500);
            }
        } catch (err) {
            console.log('error', err)
        }
    }

    const row = (scroll) => {
        if (rows === scroll) {
            return '';
        }
        return rows > scroll ? (setRows(rows - 25)) : (setRows(rows + 25));
    }

    return (
        <div className='chat-container' >
            {room._id ? (
                <div className='chat'>
                    <button onClick={handleComplaints} className='report'>{loadingComplaint ? ('Loading...') : ('Report chat')}</button>
                    <div className='conversationContainer' id='conversationContainer'>
                        <UnRead socket={socket} />
                        <Read socket={socket} />
                    </div>
                    <div className='input-message' >
                        <div>
                            <textarea
                                type='text'
                                value={sendMsj}
                                style={{ height: `${rows}px` }}
                                onChange={(e) => {
                                    row(e.target.scrollHeight)
                                    return setSendMsj(e.target.value)
                                }}
                                maxLength={200}
                                placeholder='Start typing here'
                            />
                            <button onClick={handleSend} >
                                <img src={paperPlane} alt='send' />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (<h1 className='no-chat'>Pachioli chat app</h1>)}
            {redirectComplaint ? (<Navigate to='/chatapp/complaints' replace={true} />) : ('')}
        </div>
    )
}
