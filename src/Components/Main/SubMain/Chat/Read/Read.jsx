import React, {useContext} from 'react';
import { AppContext } from '../../../../../Context/AppContext';
import Message from '../Message/Message';
import '../Chat.css';

export default function Read(){
    const {user, chats, messages} = useContext(AppContext);
    const dateFrom =(date)=>new Date(date).getTime()
    let read = [];

    if(chats){
        const chat = chats.find((chat)=> chat._id === messages.chatId);
        
        if(chat._id){
            chat.messages.sort((a, b)=>{return dateFrom(a.createdAt) < dateFrom(b.createdAt) })
            read = chat.messages.filter((msj)=>{
                if(msj.readByRecipients.length >= 2){
                    return true;
                }else{
                    if(msj.readByRecipients.some((u)=> u.readByUserId !== user._id)){
                        return true;
                    }else{return false}
                }
              }
            )
        }
        
       return (
        <div className='conversation'>
            {
                read.length > 0? (
                    read.map((msj)=>{
                        return(
                            <Message key={msj._id} user={user} id={msj._id} date={msj.createdAt} content={msj.message.messageText} postedBy={msj.postedByUser} />
                        )
                    })
                ):('')
            }
            
        </div>
       )
    }
}