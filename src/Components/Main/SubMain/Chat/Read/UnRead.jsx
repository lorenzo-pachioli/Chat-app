import React, {useContext} from 'react';
import { AppContext } from '../../../../../Context/AppContext';
import Message from '../Message/Message';
import '../Chat.css';

export default function UnRead(){
    const {user, chats,  messages} = useContext(AppContext);
    const dateFrom =(date)=>new Date(date).getTime()
    let unRead = [];
    
        if(messages.userMessages){
            const chat = chats.find((chat)=> chat._id === messages.chatId);

            if(chat._id){
                chat.messages.sort((a, b)=>{return dateFrom(a.createdAt) < dateFrom(b.createdAt) })
                unRead = chat.messages.filter((msj)=>{
                    if(msj.readByRecipients.length <= 1){
                        if(msj.readByRecipients.some((u)=> u.readByUserId === user._id)){
                            return true;
                        }else{return false}
                    }else{return false}
                    }
                )

            }
            return (
                <div className='conversation' style={unRead.length > 0? ({display: 'flex'}):({display:'none'})}>
                    
                    {
                    unRead.length > 0 ? (
                        unRead.map((msj)=>{
                            return(
                                <Message key={msj._id} user={user} id={msj._id} date={msj.createdAt} content={msj.message.messageText} postedBy={msj.postedByUser} />
                            )
                        })
                    ):('')
                    }
                    <div className='unread'>
                        <p>UNREAD</p>
                        <hr />
                    </div>
                </div>
                
            )
        }
    
}