import React, {useContext} from 'react';
import { AppContext } from '../../../../../Context/AppContext';
import trashCan from '../../../../../assets/trash-can.svg';
import axios from 'axios';
import './UserCard.css';

export default function UserCard( {id, status, img, userMessages, chatId, firstName, lastName}){

    const {user, token, setMessages, setChats, userList, newChat, setNewChat, chats, messages} = useContext(AppContext);

    const dateFrom =(date)=>{
        return new Date(date).getTime()
    }

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
                .then(response => console.log(response))
                .catch(error=> console.error(error))

            await axios.get('https://novateva-codetest.herokuapp.com/room', {headers:{'Authorization' : `Bearer ${token.auth}`}})
            .then(response => setChats(response.data.conversation))
        }else{
            if(id !== user._id){
                await userMessages.sort((a, b)=>{return dateFrom(a.createdAt) < dateFrom(b.createdAt) })
                
                setMessages({
                    chatId: chatId, 
                    userMessages: userMessages
                })
                await axios.put(`https://novateva-codetest.herokuapp.com/room/${chatId}/mark-read`,{},{
                    headers:{
                        'Authorization' : `Bearer ${token.auth}`
                    }
                })
                .then(response => console.log('read', response))
                .catch(error=> console.error(error))
                
            }
        }
        
        
    }

    const handleDelete = ()=>{
        console.log('borrar')
    }

    return(
        <div className='userCard' onClick={handleMessages}>
            <div className='sub-userCard'>
                <div className='profile-img' ><span className='dot' style={{backgroundColor:`${status === 'online'?('#8CEE5D'):('#DEDEDE')}`}} /></div>
                <div className='name'>
                    {userList ? (userList.length > 0 ? (name()):('Loading...')):('Loading...')}
                    
                    <p>{status}</p>
                    
                </div>
            </div>
           
            <p className='msj-number' style={{background:`${userMessages > 0?(background):('white')}`}} >
                {id === user._id ? (''):(userMessages.length)}
            </p>
            
            
        </div>
    )
}