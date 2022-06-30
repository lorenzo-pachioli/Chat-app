import React, {useContext, useEffect} from 'react';
import { AppContext } from '../../../../../Context/AppContext';
import trashCan from '../../../../../assets/trash-can.svg';
import './Message.css';
import  moment  from 'moment';

export default function Message( {user, id, date, content, postedBy, socket}){

    const { userList, room, setRoom, setChats} = useContext(AppContext);


    const dateFrom = moment(date).fromNow();

    const name =()=>{
        if(userList.length > 0){
            const regEx1 = postedBy.replace('{', '')
            const regEx2 = regEx1.replace('}', '')
            const nam = userList.find((u)=> u._id === regEx2);
            return nam._id === user._id ? ('Me'):(`${nam.firstName + ' ' + nam.lastName}`);
        }
    } 
    const handleDelete = async ()=>{
        socket.emit("delete_msg", {_id:user._id, room_id:room._id, message_id:id})
    }
    useEffect(() => {
        const msgDelete = ()=>{
            socket.on("delete_msg", data=>{
                console.log("delete_msg",data)
            })
        }
        msgDelete();
    }, [socket]);
    useEffect(() => {
        const msgDelete = ()=>{
            socket.on("delete_msg_res", data=>{
                if(!data.status){
                    return console.log(data.msg,':',data.error)
                }
                setRoom(data.room)
                setChats((chat)=>chat.map((c)=>c._id===data.room._id?(data.room):(c)))
                
            })
        }
        msgDelete();
    }, [setRoom, socket, setChats]);

    
    return(
        <div className='Message' style={postedBy === user._id ? ({alignItems: 'flex-end'}):({alignItems: 'flex-start'})}>
            
            <p className='date'>
                {postedBy === user._id ? (<img src={trashCan} alt='' onClick={handleDelete} />):('')}
                
                {name()}, {dateFrom}
            </p>
            <p className='content'>{content}</p>
        </div>
    )
}