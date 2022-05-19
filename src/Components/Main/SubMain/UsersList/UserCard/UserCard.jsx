import React, {useContext, useEffect} from 'react';
import { AppContext } from '../../../../../Context/AppContext';
import axios from 'axios';
import userPhoto from '../../../../../assets/user.png'
import './UserCard.css';

export default function UserCard( {id, img, chatId, photo}){

    const {user, token, setMessages,chats, setChats, userList, newChat, setNewChat, unReadNum} = useContext(AppContext);
    
    const dateFrom =(date)=>new Date(date).getTime()

    const userMessages = chats.find((chat)=> chat._id === chatId);
    

    const background = 'linear-gradient(178.18deg, #FD749B -13.56%, #281AC8 158.3%)';
    const name =()=>{
        if(userList.length > 0){
            const regEx1 = id.replace('{', '')
            const regEx2 = regEx1.replace('}', '')
            const nam = userList.find((u)=> u._id === regEx2);
            return `${nam.firstName + ' ' + nam.lastName}`;
        }
        
    } 

    const handleMessages = async ()=>{
        if(newChat){
            setNewChat(false)
            await axios.post('https://novateva-codetest.herokuapp.com/room/initiate',{
                    "userIds": [`{${user._id}}`,`${id}`],
                    "type": "consumer-to-consumer"
                },{
                    headers:{
                        'Authorization' : `Bearer ${token.auth}`
                    }
                })
                .catch(error=> console.error(error))

            await axios.get('https://novateva-codetest.herokuapp.com/room', {headers:{'Authorization' : `Bearer ${token.auth}`}})
            .then(response => setChats(response.data.conversation))
        }else{
            if(id !== user._id){
                await userMessages.messages.sort((a, b)=>{return dateFrom(a.createdAt) < dateFrom(b.createdAt) })
                
                setMessages({
                    chatId: chatId, 
                    userMessages: userMessages.messages
                })
                await axios.put(`https://novateva-codetest.herokuapp.com/room/${chatId}/mark-read`,{},{
                    headers:{
                        'Authorization' : `Bearer ${token.auth}`
                    }
                })
                .catch(error=> console.error(error))
                
            }
        }
        
        
    }
    const UnRead = ()=>{
        if(id !== user._id){
            if(unReadNum.length > 0){
                const unread = unReadNum.find((chat)=> chat.chatId === chatId );
                if(unread){
                    if(unread.unRead > 0){
                        return <p style={{background:`${unread.unRead > 0?(background):('white')}`}} >{ unread.unRead}</p>
                    }
                }
                
                
            }
        }
    }
    

    return(
        <div className='userCard' onClick={handleMessages}>
            <div className='sub-userCard'>
                <div className='profile-img' >
                    {
                        photo ? (
                            <img src={photo} className='img' alt='' />
                        ):(
                            <img src={userPhoto} className='img' alt='' />
                        )
                    }
                    
                </div>
                <div className='name'>
                    {userList ? (userList.length > 0 ? (name()):('Loading...')):('Loading...')}
                    
                </div>
            </div>
           
            <div className='msj-number'  >
                <UnRead />
            </div>
            
            
        </div>
    )
}