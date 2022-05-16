import React, {useContext, useEffect} from 'react';
import { AppContext } from '../../../../Context/AppContext';
import Chat from '../Chat/Chat';
import UserList from '../UsersList/UserList';
import axios from 'axios';
import './Submain.css';

export default function SubMain(){

    const { token, setChats} = useContext(AppContext);

    useEffect(() => {
        
        async function getConversations(){
            axios.get('https://novateva-codetest.herokuapp.com/room', {headers:{'Authorization' : `Bearer ${token.auth}`}})
            .then(response => setChats(response.data.conversation))
            .catch(error => console.error(error))
        }
        getConversations()
    }, [token, setChats]);

    
        
    

    return(
        <div className='sub-main'>
            <div className='sub-main-container'>
                <UserList />
                <Chat />
            </div>
            
            
        </div>
    )
}