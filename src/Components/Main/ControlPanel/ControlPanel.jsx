import React, {useContext} from 'react';
import { AppContext } from '../../../Context/AppContext';
import { Navigate} from "react-router-dom";
import logout from '../../../assets/logout.svg';
import chat from '../../../assets/chat-bubble.svg';
import './ControlPanel.css';

export default function ControlPanel(){

    const {logOut, setLogOut} = useContext(AppContext);

    const handleLogOut = ()=>{
        setLogOut(true)
    }

    return(
        <div className='control-panel'>
            <div className='sub-control-panel'>
                <div className='chat-message'>
                    <div>
                        <img src={chat} alt='' />
                        <p>Chat</p>
                    </div>
                    
                    <div className='num'>
                        <p>19</p>
                    </div>
                </div>
                <div className='chat-message'>
                    <div>
                        <img src={chat} alt='' />
                        <p>Complaints</p>
                    </div>
                    
                </div>
            </div>
            <button className='logout' onClick={handleLogOut}>
                <img src={logout} alt='' />
                <p>Loggout</p>
            </button>
            {logOut ? (<Navigate to='/' replace={true} />):('')}
        </div>
    )
}