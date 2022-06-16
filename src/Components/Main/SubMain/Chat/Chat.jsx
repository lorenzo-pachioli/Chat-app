import React, {useContext, useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import { AppContext } from '../../../../Context/AppContext';
import Read from './Read/Read';
import UnRead from './Read/UnRead';
import html2canvas from "html2canvas";
import './Chat.css';

export default function Chat({socket}){
    const {user, room,  setRoom, setUrl} = useContext(AppContext);
    const [sendMsj, setSendMsj] = useState('')
    const [loadingComplaint, setLoadingCompl] = useState(false)
    const [redirectComplaint, setRedirectCompl] = useState(false)
    

    const dateFrom =(date)=> new Date(date).getTime();
    
    const handleSend = async ()=> {
        if(room._id){
            try{
                await socket.to(room._id).emit("send_msg", {
                    message: sendMsj,
                    room: room._id,
                    user: [user._id]
                })
            }catch(err){
                console.log('error sending msg', err)
            }
        }
        setSendMsj('')
    }

    
    socket.once("send_msg_res",async data=>{
        if(!data.status){
            return console.log(data.msg,':',data.error)
        }
        if(room.messages.some((msg)=>msg._id === data.newMessage._id)){
            return '';
        }

        const msgOrdered = await data.room.messages.sort((a, b)=>{return dateFrom(a.time) < dateFrom(b.time) })
            
        setRoom({
            ...room, 
            messages: msgOrdered
        })
    })
    
    

    const handleComplaints = async ()=>{
        setLoadingCompl(true)
        
        const element = document.getElementById('conversationContainer')
        const canvas = await html2canvas(element);
        const image = canvas.toDataURL("image/png", 1.0);
        setUrl(image)
        if(image){
            setRedirectCompl(true)
            setTimeout(() => {
                setLoadingCompl(false)
                setRedirectCompl(false)
            }, 500);
        }
    }

    return(
        <div className='chat-container' >
            {room.chatId ? (
                <div className='chat'>
                        <div className='conversationContainer' id='conversationContainer'>
                            <UnRead />
                            <Read />
                        </div>
                    <div className='input-message'>
                        <button onClick={handleComplaints} className='report'>{loadingComplaint ? ('Loading...'):('Report chat')}</button>
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