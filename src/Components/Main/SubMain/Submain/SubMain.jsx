import React, {useContext} from 'react';
import { AppContext } from '../../../../Context/AppContext';
import Chat from '../Chat/Chat';
import UserList from '../UsersList/UserList';
import './Submain.css';

export default function SubMain({socket}){

    const { chats, setChats } = useContext(AppContext);
    
    socket.once("send_msg_res", data=>{
        if(!data.status){
            return console.log(data.msg,':', data.error)
        }
        console.log(data.newMessage)
        const checkMessage = chats.some((chat)=> chat._id===data.room._id ? (chat.some(msg=>msg._id === data.newMessage._id)):(false))
        if(checkMessage){
            return '';
        }
        setChats(chats.map((chat)=> chat._id === data.room._id ? (data.room):(chat)))
    })
     
    return(
        <div className='sub-main'>
            <div className='sub-main-container'>
                <UserList />
                <Chat socket={socket}/>
            </div>
            
            
        </div>
    )
}