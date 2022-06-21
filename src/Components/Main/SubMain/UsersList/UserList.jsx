import React, {useContext, useEffect} from 'react';
import { AppContext } from '../../../../Context/AppContext';
import userPhoto from  '../../../../assets/user.png';
import UserCard from './UserCard/UserCard';
import './UserList.css';

export default function UserList({socket}){

    const {user, chats, setChats, userList, newChat, setNewChat} = useContext(AppContext);
    

    const findUserId = (users)=>{
        const UId = users.find((id)=>{
            const regEx1 = id.replace('{', '')
            const regEx2 = regEx1.replace('}', '')
            return regEx2 !== user._id
        })
        return UId;
    }
    useEffect(() => {
        const newChat = ()=>{
            socket.on("init_room_res", data=>{
        
                if(!data.status){
                    return console.log(data.msg,':',data.error)
                }
                if(data.msg){
                    return console.log(data.msg)
                }
                console.log('init room', data)
                setChats(chat=>{
                    if(chat.some(c=> c._id === data.room._id)){
                        return chat;
                    }
                    return [...chat, data.room]
                    })
            })
        }
        newChat()
    }, [setChats, socket]);
    
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
                          return u._id === user._id ? (false):( <UserCard key={u._id} id={u._id}  img={u.img} socket={socket} />)
                        })
                    ):('')
                    
                ):(
                    chats.length > 0 ? (
                        chats.map((u)=> {
                            return(
                                <UserCard key={u._id} id={findUserId(u.users)} chatId={u._id} img={u.img} socket={socket} />
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