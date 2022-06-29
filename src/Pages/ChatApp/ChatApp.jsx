import React, {useEffect, useContext} from 'react';
import { Navigate } from "react-router-dom";
import { AppContext } from '../../Context/AppContext';
import TopBar from '../../Components/Topbar/TopBar';
import Main from '../../Components/Main/Main/Main';

import './ChatApp.css';


export default function ChatApp({socket}) {
  const {user, chats, setUnReadNum} = useContext(AppContext);

  //All un read messages amount
  useEffect(() => {
    const unRead = chats.map((chat)=>{
      const unreadMsj = chat.messages.filter((msj)=>{
        if(msj.readBy.length > 1){
          return false
        }
        if(msj.readBy.some((u)=> u === user._id)){
            return false;
        }
        return true;
        }
      )
      return {chatId:chat._id, unRead: unreadMsj.length}
    })
    setUnReadNum(unRead)
  },[chats, user, setUnReadNum ]);


  const inHeight ={
    height:window.innerHeight
  }
  
  
  return ( sessionStorage.getItem('email') ? (
        <div className="ChatApp" style={inHeight} >
          <TopBar/>
          <Main socket={socket}/>
        </div>
      ):(
        <Navigate to='/' replace={true} />
      )
      
    
  );
}