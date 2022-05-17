import React, { useContext} from 'react';
import { AppContext } from '../../../Context/AppContext';
import userPhoto from '../../../assets/user.png';
import '../SubMain/Submain/Submain.css'
import './Delete.css';

export default function Delete(){
    const {user, chats, userList} = useContext(AppContext);

    const findUserName = (userIds)=>{

        if(userIds.length > 0 && userList.length > 0){

            const UId = userIds.find((id)=>{
                const regEx1 = id.replace('{', '')
                const regEx2 = regEx1.replace('}', '')
                return regEx2 !== user._id
            })

            const nam = userList.find((u)=> u._id === UId);

            return `${nam.firstName + ' ' + nam.lastName}`;
        }
    }

   

    return(
        <div className='sub-main'>
            <div className='sub-main-container' style={{flexDirection: 'column'}} >
                <h1>Delete chat</h1>
                <p>Wich chat would you like to delete:</p>
                <div className='complaints-chats'>
                    {/* {chats.length > 0 ? (
                        chats.map((chat)=>{
                            return(
                                <div>
                                    <img src={userPhoto} alt='' />
                                    <h3>{findUserName(chat.userIds)}</h3>
                                </div>
                            )
                    })):('')
                    } */}
                </div>
            </div>
            
            
        </div>
    )
}