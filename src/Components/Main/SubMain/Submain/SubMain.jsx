import Chat from '../Chat/Chat';
import UserList from '../UsersList/UserList';
import './Submain.css';

export default function SubMain(){

    return(
        <div className='sub-main'>
            <div className='sub-main-container'>
                <UserList />
                <Chat />
            </div>
            
            
        </div>
    )
}