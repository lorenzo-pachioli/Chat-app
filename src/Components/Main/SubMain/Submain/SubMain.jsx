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
        
        const socket = io(`ws://novateva-codetest.herokuapp.com/?roomId=604b1ea216944d278759854e80fd4775`)
        socket.on("connect", () => {
            console.log(socket.connected);
        });
        
            
        

        const getConversations = async () =>{
            
            
            await axios.get('https://novateva-codetest.herokuapp.com/room', {headers:{'Authorization' : `Bearer ${token.auth}`}})
            .then(response => setChats(response.data.conversation))
            .catch(error => console.error(error))
            
            if(messages.chatId){
                await axios.put(`https://novateva-codetest.herokuapp.com/room/${messages.chatId}/mark-read`,{},{
                 headers:{
                    'Authorization' : `Bearer ${token.auth}`
                }
                })
                .then(response=> response.status === 200 ? (socket.emit('new message', 'new message')):(''))
                .catch(error=> console.error(error))
            }
            
        }


        if(token.auth){
            getConversations()
        }
        socket.once('new message', (data)=> {
            if(token.auth){
                getConversations();
            }
            
            
        });

        socket.onAny(data => console.log(data))
        

        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err}`);
        });
        
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