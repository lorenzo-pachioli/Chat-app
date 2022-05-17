import React, {useEffect, useContext} from 'react';
import { Route, Routes } from "react-router-dom";
import ChatApp from './Pages/ChatApp/ChatApp';
import Login from './Pages/Login/Login';
import LoginBtn from './Components/Login/Log in/LoginBtn';
import Options from './Components/Login/options/Options';
import SignIn from './Components/Login/Sign in/SignIn';
import Complaints from './Components/Main/Complaints/Complaints';
import Delete from './Components/Main/Delete/Delete';
import SubMain from './Components/Main/SubMain/Submain/SubMain';
import { AppContext } from './Context/AppContext';
import axios from "axios";

import './App.css';


function App() {

  const {user, chats, setUser, token, setToken, setUserList, setRedirect, setUnReadNum} = useContext(AppContext);
  
//first set user from the page log in

  useEffect(() => {

     async function getUser(){
      try{
        const docRef = await axios.get(`https://novateva-codetest.herokuapp.com/users`)
        .then(response =>  response.data.users)
        .catch((e)=>console.error(e))
        if(docRef.length > 0){
          const U = docRef.filter((u)=> u.email === token.email)
          setUser(U[0]);
          sessionStorage.setItem('user', `${U[0]._id}`);
          setUserList(docRef);
          setRedirect(true);
        }
      }catch(e){
        console.error(`Error: ${e}`)
      }
    }
    if(token.auth){
      getUser();
    }
    
    
  }, [token, setUser, setUserList, setRedirect]);

  //On page re load set user

  useEffect(() => {
    const tempUsr = sessionStorage.getItem('user');
    async function onReload(){
      
      await axios.get(`https://novateva-codetest.herokuapp.com/users/${tempUsr}`)
        .then(response => setUser(response.data.user))
        .catch((e)=>console.error(e))
    }
    if(tempUsr && token.auth === undefined ){
      
      if(tempUsr.length > 0 ){
        onReload()
      }
    }
  }, [setUser, token]);
  

  //on reload set user token

  useEffect(() => {
    const tempToken = sessionStorage.getItem('token');
    const tempEmail = sessionStorage.getItem('email');

    if(tempToken && tempEmail){
      
      if(tempToken.length > 0 && tempEmail.length > 0){
        setToken({auth:tempToken, email:tempEmail})
      }
    }
    
  }, [setToken]);



  //All un read messages amount

  useEffect(() => {

    const unRead = chats.map((chat)=>{
      const unreadMsj = chat.messages.filter((msj)=>{
        if(msj.readByRecipients.length <= 1){
            if(msj.readByRecipients.some((u)=> u.readByUserId !== user._id)){
                return true;
            }else{return false}
        }else{return false}
        }
      )
      return {chatId:chat._id, unRead: unreadMsj.length}
    })
  setUnReadNum(unRead)

  },[chats, user, setUnReadNum ]);

  

  

  return (
    <div className="App">
      <Routes>
        <Route>
          <Route path="chatapp" element={<ChatApp />} >
            <Route path="complaints" element={<Complaints />} />
            <Route path="delete" element={<Delete />} />
            <Route path="" element={<SubMain/>} />
          </Route>

        </Route>
        
        <Route>
          <Route exact path="/" element={<Login />}>
          
            <Route path="signin" element={<SignIn />} />
            <Route path="login" element={<LoginBtn />} />
            <Route path="" element={<Options />} />
      
          </Route>

        </Route>

        
      </Routes>
      
    </div>
  );
}

export default App;
