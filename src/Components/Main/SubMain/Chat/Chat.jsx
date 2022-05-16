import React, {useContext, useState} from 'react';
import { AppContext } from '../../../../Context/AppContext';
import Read from './Read/Read';
import UnRead from './Read/UnRead';
import './Chat.css';
import axios from 'axios';

export default function Chat(){
    const {token, messages, setMessages} = useContext(AppContext);
    const [sendMsj, setSendMsj] = useState('')

    const dateFrom =(date)=>{
        console.log('ordenando array')
        return new Date(date).getTime()}

    const handleSend = async ()=> {
        let temMessage =  messages.userMessages;
        if(messages.chatId){
            console.log('mensajes', sendMsj)
            await axios.post(`https://novateva-codetest.herokuapp.com/room/${messages.chatId}/message`,{
                "messageText": `${sendMsj}`
            },{
                headers:{
                    'Authorization' : `Bearer ${token.auth}`
                }
            })
            .then(response =>temMessage.push(response.data.post))
            .catch(error => console.log('error:', error))
            console.log('mensajes1', temMessage)
            await temMessage.sort((a, b)=>{return dateFrom(a.createdAt) < dateFrom(b.createdAt) })
            setMessages({
                ...messages, 
                userMessages: temMessage
            })
            
        }
        setSendMsj('')
    }


    

    return(
        <div className='chat'>
            <div className='conversationContainer'>
                <UnRead />
                <Read />
            </div>
            
            <div className='input-message'>
                <div>
                    <textarea  
                    value={sendMsj}
                    onChange={(e)=>setSendMsj(e.target.value)}
                    maxLength="200"
                    placeholder='Start typing here' />
                    <button onClick={handleSend}>SEND</button>

                </div>
            </div>
        </div>
    )
}