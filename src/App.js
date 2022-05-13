import React, {useEffect} from 'react';
import { Route, Routes } from "react-router-dom";
import ChatApp from './Pages/ChatApp/ChatApp';
import Login from './Pages/Login/Login';
import LoginBtn from './Components/Login/Log in/LoginBtn';
import Options from './Components/Login/options/Options';
import SignIn from './Components/Login/Sign in/SignIn';
import axios from "axios";

import './App.css';


function App() {

  

  /* useEffect(() => {
     async function getUser(){

      try{
        const docRef = await axios.delete(`https://novateva-codetest.herokuapp.com/users/9ecb2f89d9ea45b5bf620c49e3c086fc`)
        .then(response => console.log(response.data.users))
        .catch((e)=>console.error(e))
        return docRef;
      }catch(e){
        console.error(`Error: ${e}`)
      }
    }
    getUser();
  }, []); */

  return (
    <div className="App">
      <Routes>
        <Route exact path="/chatapp" element={<ChatApp />} />
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
