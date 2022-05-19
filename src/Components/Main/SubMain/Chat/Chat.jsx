import React, {useContext, useState} from 'react';
import {Navigate} from 'react-router-dom';
import { AppContext } from '../../../../Context/AppContext';
import Read from './Read/Read';
import UnRead from './Read/UnRead';
import html2canvas from "html2canvas";
import './Chat.css';
import axios from 'axios';

export default function Chat(){
    const {token, messages, chats, setMessages, setUrl} = useContext(AppContext);
    const [sendMsj, setSendMsj] = useState('')
    const [redirectComplaint, setRedirectCompl] = useState(false)
    
    

    const dateFrom =(date)=> new Date(date).getTime();
    const url = 'https://novateva-codetest.herokuapp.com/?roomId=604b1ea216944d278759854e80fd4775'

      
    


    const handleSend = async ()=> {
        let temMessage =  messages.userMessages;
        
        /* socket.emit("message", 'message'); */
        
        if(messages.chatId){
            
            
            await axios.post(`https://novateva-codetest.herokuapp.com/room/${messages.chatId}/message`,{
                "messageText": `${sendMsj}`
            },{
                headers:{
                    'Authorization' : `Bearer ${token.auth}`
                }
            })
            .then(response =>temMessage.push(response.data.post))
            .catch(error => console.log('error:', error))

            
            
            await temMessage.sort((a, b)=>{return dateFrom(a.createdAt) < dateFrom(b.createdAt) })
            
            setMessages({
                ...messages, 
                userMessages: temMessage
            })
            
        }
        setSendMsj('')
    }

    const handleComplaints = async ()=>{
        
        const element = document.getElementById('conversationContainer')
        const canvas = await html2canvas(element);
        const image = canvas.toDataURL("image/png", 1.0);
        setUrl(image)
        if(image){
            setRedirectCompl(true)
            setTimeout(() => {
                setRedirectCompl(false)
            }, 500);
        }
    }



    
    
    return(
        <div className='chat-container' >
            {messages.chatId ? (
                <div className='chat'>
                        <div className='conversationContainer' id='conversationContainer'>
                            <UnRead />
                            <Read />
                        </div>
                    <div className='input-message'>
                        <button onClick={handleComplaints} className='report'>Report chat</button>
                        <div>
                            <textarea  
                            value={sendMsj}
                            onChange={(e)=>setSendMsj(e.target.value)}
                            maxLength="200"
                            placeholder='Start typing here'/>
                            <button onClick={handleSend}>SEND</button>

                        </div>
                    </div>
                </div>
            ):(<h1 className='no-chat'>Novateva chat app</h1>)}
            {redirectComplaint ? (<Navigate to='/chatapp/complaints' replace={true} />):('')}
        </div>
            
            
        
    )
}