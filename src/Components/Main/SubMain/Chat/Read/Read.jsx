import React, {useContext} from 'react';
import { AppContext } from '../../../../../Context/AppContext';
import Message from '../Message/Message';
import '../Chat.css';

export default function Read(){
    const {user,  messages} = useContext(AppContext);

    if(messages.userMessages){
        const read = messages.userMessages.filter((msj)=>{
            if(msj.readByRecipients.length >= 2){
                return true;
            }else{
                if(msj.readByRecipients.some((u)=> u.readByUserId !== user._id)){
                    return true;
                }else{return false}
            }
          }
        )
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