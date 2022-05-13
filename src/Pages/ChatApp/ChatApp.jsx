import React, {useEffect} from 'react';
import TopBar from '../../Components/Topbar/TopBar';
import Main from '../../Components/Main/Main/Main';
import axios from "axios";

import './ChatApp.css';


export default function ChatApp() {

  

  return (
    <div className="ChatApp">
      <TopBar />
      <Main />
    </div>
  );
}