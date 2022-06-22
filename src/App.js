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
import io from 'socket.io-client';

import './App.css';
const socket = io.connect("http://chat-app-pachioli.herokuapp.com")
/* const socket = io.connect("http://localhost:3001") */

function App() {

  const {user, loading, setChats, setUser, setUserList} = useContext(AppContext);

  //log in
  useEffect(() => {
    const logIn = async ()=>{
          socket.on("log_in_res", (data) => {
          if(!data.status){
            return console.error(data.msg, ':', data.error)
          }
          setUser(user =>{
            if(user._id){
              return user;
            }
            sessionStorage.setItem('password', `${data.user.password}`);
            sessionStorage.setItem('email', `${data.user.email}`);
            socket.emit("get_users", {_id:data.user._id})
            return data.user;
          })
          setChats(chat=> {
            if(chat.length > 0){
              return chat;
            }
            return data.rooms;
          })
        });
      }
    
    logIn();
  }, [setUser,setChats]);
  
  //On page re load set user

  useEffect(() => {
    const tempEmail = sessionStorage.getItem('email');
    const tempPass = sessionStorage.getItem('password');
    const onReload= ()=>{
      if(loading){
        return '';
      }
      if(tempEmail && tempPass){
        try{
          socket.emit("log_in", {
            email: tempEmail,
            password: tempPass
          })
        }catch(err){
          console.log(`Something went wrong on reloading page, error: ${err}`)
        }
      }
    }
    if(tempEmail && tempPass && user._id === undefined ){
        onReload()
    }
  }, [user, loading]);

  //log out 
  useEffect(() => {
    const logOut = ()=>{
      socket.on('disconnect', data => {
        console.log('disconnect', data)
      });
    }
    logOut();
  }, []);

  //get users list
  useEffect(() => {
    const getUser = async ()=>{
      socket.on("get_users_res", data=>{
        if(!data.status){
          return console.error(data.msg, ':', data.error)
        }
        setUserList(data.users);
      })
    }
    getUser();
  }, [setUserList]);

  return (
    <div className="App">
      <Routes>
        <Route>
          <Route path="chatapp" element={<ChatApp socket={socket}/>} >
            <Route path="complaints" element={<Complaints />} />
            <Route path="delete" element={<Delete socket={socket}/>} />
            <Route path="" element={<SubMain socket={socket}/>} />
          </Route>
        </Route>
        <Route>
          <Route exact path="/" element={<Login />}>
            <Route path="signin" element={<SignIn socket={socket}/>} />
            <Route path="login" element={<LoginBtn socket={socket} />} />
            <Route path="" element={<Options />} />
          </Route>
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
