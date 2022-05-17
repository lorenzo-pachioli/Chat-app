import React, { useContext, useState} from 'react';
import { AppContext } from '../../../Context/AppContext';
import userPhoto from '../../../assets/user.png';
import '../SubMain/Submain/Submain.css'
import './Delete.css';
import axios from 'axios';

export default function Delete(){
    const {user, token, chats, setChats, userList} = useContext(AppContext);
    const [deleteChat, setDelete] = useState('')

    const findUserName = (userIds)=>{

        if(userIds.length > 0 && userList.length > 0){

            const UId = userIds.find((id)=>{
                const regEx1 = id.replace('{', '')
                const regEx2 = regEx1.replace('}', '')
                return regEx2 !== user._id
            })
            
            const nam = userList.find((u)=> {
                const regEx1 = UId.replace('{', '')
                const regEx2 = regEx1.replace('}', '')
            return u._id === regEx2});

            return `${nam.firstName + ' ' + nam.lastName}`;
        }
        
    }

    const handleDelete = ()=>{
        if(deleteChat.length > 0 && token.auth){
            
            axios.delete(`https://novateva-codetest.herokuapp.com/delete/room/${deleteChat}`,{
                headers:{'Authorization' : `Bearer ${token.auth}`}
            })
            .catch(error => console.error(error))

            setChats(chats.filter((chat)=> chat._id !== deleteChat))
            setDelete('')
        }

    }

   

    return(
        <div className='sub-main'>
            <div className='sub-main-container' style={{flexDirection: 'column'}} >
                <div className='delete-container'>
                    <h1>Delete chat</h1>
                    <p>Wich chat would you like to delete:</p>
                    <div className='delete-chats'>
                        {chats.length > 0 ? (
                            chats.map((chat)=>{
                                return(
                                    <div className='chat-card' key={chat._id} onClick={()=>setDelete(chat._id)}>
                                        <img src={userPhoto} alt='' />
                                        <h3>{findUserName(chat.userIds)}</h3>
                                    </div>
                                )
                                    
                        })):('')
                        }
                    </div>
                    {deleteChat ? (
                        <button onClick={handleDelete}>Delete</button>
                    ):('')}
                </div>    
            </div>
            
            
        </div>
    )
}