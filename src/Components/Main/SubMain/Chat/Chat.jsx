import Message from './Message/Message';
import  moment  from 'moment';
import './Chat.css';

export default function Chat(){
    const date = moment().startOf('hour').fromNow();

    return(
        <div className='chat'>
            <div className='conversation'>
                <Message date= {date} content={'some text'} />
            </div>
            <div className='input-message'>
                <div>
                    <textarea  
                    maxLength="200"
                    placeholder='Start typing here' />
                    <button>SEND</button>

                </div>
            </div>
        </div>
    )
}