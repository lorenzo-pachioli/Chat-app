import React, {useContext, useState} from 'react';
import { AppContext } from '../../../../../Context/AppContext';
import Message from '../Message/Message';
import '../Chat.css';

export default function Read(){
    const {user, room} = useContext(AppContext);
    const [read, setRead]= useState([]);
    const dateFrom =(date)=>new Date(date).getTime();

    if(room._id && user._id){
        const readMsg = room.messages.filter((msj)=>{
            if(msj.readBy.length > 1){
                return true;
            }
            if(msj.readBy.some((id)=> id !== user._id)){
                return true;
            }
            return false
        })
        readMsg.sort((a, b)=>{return dateFrom(a.time) < dateFrom(b.time) })
        setRead(readMsg);
    }
        
    return (
        <div className='conversation'>
            {read.length > 0? (
                read.map((msj)=>{
                    return(
                        <Message key={msj._id} user={user} id={msj._id} date={msj.time} content={msj.message} postedBy={msj.user} />
                    )
                })
            ):('')}
        </div>
    )
}
