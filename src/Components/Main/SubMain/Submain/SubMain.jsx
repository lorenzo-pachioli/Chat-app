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
        let socket = (chatRoomId)=>{
            return io(`ws://novateva-codetest.herokuapp.com/?roomId=${chatRoomId}`)
        }
        
        const getConversations = async () =>{
            
            await axios.get('https://novateva-codetest.herokuapp.com/room', {headers:{'Authorization' : `Bearer ${token.auth}`}})
            .then(response => setChats(response.data.conversation))
            .catch(error => console.error(error))
        }


        if(token.auth){
           
            setInterval(() => {
                getConversations() 
            }, 2000);
        }

        if(messages.chatId){
            socket(messages.chatId).once('new message', ()=> {
                if(token.auth){
                    getConversations();
                }
            });
        
           /*  socket(messages.chatId).on("connect_error", (err) => {
                console.log(`connect_error due to ${err}`);
            }); */
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