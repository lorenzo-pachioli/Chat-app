import React, { useContext} from 'react';
import { AppContext } from '../../../Context/AppContext';
import userPhoto from '../../../assets/user.png';
import '../SubMain/Submain/Submain.css'
import './Complaints.css';

export default function Complaints(){
    const {user, chats, userList} = useContext(AppContext);

    const findUserName = (userIds)=>{

        if(userIds.length > 0 && userList.length > 0){

            const UId = userIds.find((id)=>{
                const regEx1 = id.replace('{', '')
                const regEx2 = regEx1.replace('}', '')
                return regEx2 !== user._id
            })
            
            const nam = userList.find((u)=> {
                const regEx1 = UId.replace('{', '')
                const regEx2 = regEx1.replace('}', '')
            return u._id === regEx2});

            return `${nam.firstName + ' ' + nam.lastName}`;
        }
        
    }
   

    return(
        <div className='sub-main'>
            <div className='sub-main-container'>
                <div className='comlpaints-container'>
                    <h1>Send Complaints</h1>
                    <textarea 
                    maxLength="200"
                    placeholder='Tell us about the problem' />
                    <p>Select the chat you want to report</p>
                    <div className='complaints-chats'>
                        {chats.length > 0 ? (
                            chats.map((chat)=>{
                                return(
                                    <div className='chat-card'>
                                        <img src={userPhoto} alt='' />
                                        <h3>{findUserName(chat.userIds)}</h3>
                                    </div>
                                )
                                
                        })):('')
                        }
                    </div>
                    <button>Send</button>

                </div>
                
            </div>
            
            
        </div>
    )
}