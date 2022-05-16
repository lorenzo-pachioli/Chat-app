import React, {useContext} from 'react';
import { AppContext } from '../../../../../Context/AppContext';
import './Message.css';
import  moment  from 'moment';

export default function Message( {user, id, date, content, postedBy, readBy}){

    const {userList,} = useContext(AppContext);


    const dateFrom = moment(date).fromNow();

    const name =()=>{
        if(userList.length > 0){
            const regEx1 = postedBy.replace('{', '')
            const regEx2 = regEx1.replace('}', '')
            const nam = userList.find((u)=> u._id === regEx2);
            return nam._id === user._id ? ('Me'):(`${nam.firstName + ' ' + nam.lastName}`);
            
        }
        
    } 
    name();

    return(
        <div className='Message' style={postedBy === user._id ? ({alignItems: 'flex-end'}):({alignItems: 'flex-start'})}>
            
            <p className='date'>{name()}, {dateFrom}</p>
            <p className='content'>{content}</p>
        </div>
    )
}