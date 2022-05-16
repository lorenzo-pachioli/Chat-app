import React, {useEffect, useContext} from 'react';
import TopBar from '../../Components/Topbar/TopBar';
import Main from '../../Components/Main/Main/Main';
import { AppContext } from '../../Context/AppContext';
import axios from "axios";

import './ChatApp.css';


export default function ChatApp() {

  const {user} = useContext(AppContext);
  

  return (
    <div className="ChatApp">
      <TopBar user={user}/>
      <Main />
    </div>
  );
}