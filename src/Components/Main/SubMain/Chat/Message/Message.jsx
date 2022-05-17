import React, {useContext} from 'react';
import { AppContext } from '../../../../../Context/AppContext';
import trashCan from '../../../../../assets/trash-can.svg';
import './Message.css';
import  moment  from 'moment';
import axios from 'axios';

export default function Message( {user, id, date, content, postedBy}){

    const {userList,token, messages, setMessages, setChats} = useContext(AppContext);


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

        await axios.delete(`https://novateva-codetest.herokuapp.com/delete/message/${id}`,{
            headers:{'Authorization': `Bearer ${token.auth}`}
        })
        .catch(error=> console.error(error))

        const delMsj = messages.userMessages.filter((msj)=> msj._id !== id)

        setMessages({
            ...messages, 
            userMessages: delMsj
        })

        await axios.get('https://novateva-codetest.herokuapp.com/room', {headers:{'Authorization' : `Bearer ${token.auth}`}})
        .then(response => setChats(response.data.conversation))
        .catch(error => console.error(error))
    }

    
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