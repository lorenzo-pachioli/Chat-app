import React, {useContext} from 'react';
import { AppContext } from '../../../../../Context/AppContext';
import userPhoto from '../../../../../assets/user.png'
import './UserCard.css';

export default function UserCard( {socket, id, img, online, chatId, photo}){

    const {user,room, setRoom,chats, userList, newChat, setNewChat, unReadNum} = useContext(AppContext);
    
    const background = 'linear-gradient(178.18deg, #FD749B -13.56%, #281AC8 158.3%)';
    const name =()=>{
        const regEx1 = id.replace('{', '')
        const regEx2 = regEx1.replace('}', '')
        const nam = userList.find((u)=> u._id === regEx2);
        return `${nam.firstName + ' ' + nam.lastName}`;
    } 

    const handleMessages = async ()=>{
        if(newChat){
            socket.emit("init_room", {otherUser:id, _id:user._id})
            return setNewChat(false);
        }
        if(id !== user._id){
            console.log('chat', chatId)
            setRoom(chats.find(chat=> chat._id === chatId))
            socket.emit("read_msg", {_id:user._id, room_id:chatId})
        }
        socket.emit('log_user')
    }
    const UnRead = ()=>{
        if(id === user._id){
           return <p style={{background:'white'}}></p>;
        }
        if(unReadNum.length === 0){
            return <p style={{background:'white'}}></p>;
        }
        const unread = unReadNum.find((chat)=> chat.chatId === chatId );
        if(unread){
            if(unread.chatId === room._id){
                return <p style={{background:'white'}}></p>;
            }
            if(unread.unRead > 0){
                return <p style={{background:`${unread.unRead > 0?(background):('white')}`}} >{ unread.unRead}</p>
            }
        }    
    }

    /* const handleDelete= ()=>{
        console.log('1 delete user');
        const tempPass = sessionStorage.getItem('password');
        console.log(user._id, tempPass);
        if( user._id && tempPass){
            try{
              console.log('2 delete user');
              socket.emit("delete_user", {
                _id: user._id,
                password: tempPass
              })
            }catch(err){
              console.log(`Something went wrong on reloading page, error: ${err}`)
            }
          }
    } */
    
    return(
        <div className='userCard' onClick={handleMessages}>
            <div className='sub-userCard'>
                <div className='profile-img'>
                    { photo ? (
                            <img src={photo} className='img' alt='' />
                            
                        ):(
                            <img src={userPhoto} className='img' alt='' />
                        )
                    }
                    <span className='dot'  style={{'backgroundColor': `${online ? ('#2e7d32'):('darkGrey')}`}} />
                </div>
                <div className='name'>
                    {userList ? (userList.length > 0 ? (name()):('Loading...')):('Loading...')}
                </div>
            </div>
           
            <div className='msj-number'  >
                <UnRead />
            </div>
            
            
        </div>
    )
}