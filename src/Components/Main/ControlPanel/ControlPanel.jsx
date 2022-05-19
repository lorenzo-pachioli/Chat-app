import React, {useContext} from 'react';
import { AppContext } from '../../../Context/AppContext';
import { Link, Navigate} from "react-router-dom";
import io from 'socket.io-client';
import logout from '../../../assets/logout.svg';
import trasCan from '../../../assets/trash-can-white.svg';
import chat from '../../../assets/chat-bubble.svg';
import './ControlPanel.css';

export default function ControlPanel(){

    const {logOut, messages, setLogOut, unReadNum, setUser, setUserList, setToken, setRedirect, setChats,setMessages, setLoading, setUnReadNum} = useContext(AppContext);

    const handleLogOut = ()=>{
        let socket = (chatRoomId)=>{
            return io.disconnect(`ws://novateva-codetest.herokuapp.com/?roomId=${chatRoomId}`)
        }
        setLogOut(true)
        setUser({})
        setUserList({})
        setToken({})
        setRedirect(false)
        setChats([])
        setMessages([])
        setLoading(false)
        setUnReadNum([])
        socket(messages.chatId);
        sessionStorage.setItem('user', ``);
        sessionStorage.setItem('token', ``);
        sessionStorage.setItem('email', ``);
        setTimeout(() => {
            setLogOut(false)
        }, 1000);
    }
    const UnRead = ()=>{
        if(unReadNum.length > 0){
            const unread = unReadNum.filter((chat)=> chat.unRead > 0 );
            if(unread.length > 0){
                return (
                    <div>
                        <p className='sub-num'>{ unread.length}</p>
                    </div>
                )
            }
            
        }
        
    }

    return(
        <div className='control-panel'>
            <div className='sub-control-panel'>
                <Link to='/chatapp' className='chat-message'>
                    <div>
                        <img src={chat} alt='' />
                        <p>Chat</p>
                    </div>
                    
                    <div className='num'>
                        <UnRead />
                    </div>
                </Link>
                <Link to='/chatapp/complaints' className='chat-message'>
                    <div>
                        <img src={chat} alt='' />
                        <p>Complaints</p>
                    </div>
                    
                </Link>
                <Link to='/chatapp/delete' className='chat-message'>
                    <div>
                        <img src={trasCan} fill='white' alt='' />
                        <p>Delete chat</p>
                    </div>
                    
                </Link>
            </div>
            <button className='logout' onClick={handleLogOut}>
                <img src={logout} alt='' />
                <p>Loggout</p>
            </button>
            {logOut ? (<Navigate to='/' replace={true} />):('')}
        </div>
    )
}