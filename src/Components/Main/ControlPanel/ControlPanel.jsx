import logout from '../../../assets/logout.svg';
import chat from '../../../assets/chat-bubble.svg';
import './ControlPanel.css';

export default function ControlPanel(){

    return(
        <div className='control-panel'>
            <div className='sub-control-panel'>
                <div className='chat'>
                    <div>
                        <img src={chat} alt='' />
                        <p>Chat</p>
                    </div>
                    
                    <div className='num'>
                        <p>19</p>
                    </div>
                </div>
            </div>
            <button className='logout'>
                <img src={logout} alt='' />
                <p>Loggout</p>
            </button>
        </div>
    )
}