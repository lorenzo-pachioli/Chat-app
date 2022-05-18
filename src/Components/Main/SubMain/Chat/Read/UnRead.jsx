import React, {useContext} from 'react';
import { AppContext } from '../../../../../Context/AppContext';
import Message from '../Message/Message';
import '../Chat.css';

export default function UnRead(){
    const {user,  messages} = useContext(AppContext);
    
        if(messages.userMessages){

            const unRead = messages.userMessages.filter((msj)=>{
                if(msj.readByRecipients.length <= 1){
                    if(msj.readByRecipients.some((u)=> u.readByUserId === user._id)){
                        return true;
                    }else{return false}
                }else{return false}
                }
            )
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