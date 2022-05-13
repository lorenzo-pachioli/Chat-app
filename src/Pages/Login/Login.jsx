import React, {useEffect} from 'react';
import { Outlet  } from "react-router-dom";
/* import LoginBtn from '../../Components/Login/Log in/LoginBtn';
import Options from '../../Components/Login/options/Options';
import SignIn from '../../Components/Login/Sign in/SignIn'; */
import axios from "axios";

import './Login.css';


export default function Login() {

  

  return (
    <div className="Login">
      <div className='subLogin'>
        <div className='title'>
            <h1>Welcome to </h1>
            <h1>Novateva chat</h1>
        </div>
        <div className='logOptions'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}