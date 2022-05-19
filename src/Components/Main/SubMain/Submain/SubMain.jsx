import React, {useContext, useEffect} from 'react';
import { AppContext } from '../../../../Context/AppContext';
import Chat from '../Chat/Chat';
import UserList from '../UsersList/UserList';
import axios from 'axios';
import io from 'socket.io-client';
import './Submain.css';


export default function SubMain(){

    const { token, setChats, messages } = useContext(AppContext);


    useEffect(() => {
        
        let socket = '';
        if(messages.chatId){
            socket = io(`ws://novateva-codetest.herokuapp.com/?roomId=${messages.chatId}`)
        }
        
        const getConversations = async () =>{
            
            await axios.get('https://novateva-codetest.herokuapp.com/room', {headers:{'Authorization' : `Bearer ${token.auth}`}})
            .then(response => setChats(response.data.conversation))
            .catch(error => console.error(error))
        }


        if(token.auth){
            getConversations()
        }

        if(socket.length > 0){
            socket.once('new message', (data)=> {
                if(token.auth){
                    getConversations();
                }
            });
    
            socket.on("connect_error", (err) => {
                console.log(`connect_error due to ${err}`);
            });

        }
        
        
    }, [token, setChats,messages]);

    return(
        <div className='sub-main'>
            <div className='sub-main-container'>
                <UserList />
                <Chat />
            </div>
            
            
        </div>
    )
}