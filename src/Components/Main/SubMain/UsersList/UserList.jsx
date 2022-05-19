import React, {useContext} from 'react';
import { AppContext } from '../../../../Context/AppContext';
import userPhoto from  '../../../../assets/user.png';
import UserCard from './UserCard/UserCard';
import './UserList.css';

export default function UserList(){

    const {user, chats, userList, newChat, setNewChat} = useContext(AppContext);
    

    const findUserId = (userIds)=>{
        
        const UId = userIds.find((id)=>{
            const regEx1 = id.replace('{', '')
            const regEx2 = regEx1.replace('}', '')
            return regEx2 !== user._id
        })
        return UId;
    }
    
    return(
        <div className='user-list'>
            <div className='sub-user-list' >
                {user ? (
                    <UserCard id={user._id} status={'online'} img={userPhoto}  />
                ):(
                    <p>Loading...</p>
                )}
                
            </div>
            <div className='open-chats'>
                {newChat ? (
                    userList.length > 0 ? (
                        userList.map((u)=> {
                          return u._id === user._id ? (false):( <UserCard key={u._id} id={u._id}  img={u.img} />)
                        })
                    ):('')
                    
                ):(
                    chats.length > 0 ? (
                        chats.map((u)=> {
                            
                            return(
                                <UserCard key={u._id} id={findUserId(u.userIds)} chatId={u._id} img={u.img}  />
                            )
                        })
                    ):('')
                )
                }
            </div>
            <div className='new-chat' >
                <button onClick={()=> setNewChat(!newChat)}>{newChat ? ('Back'):('New chat')}</button>
            </div>
            
        </div>
    )
}