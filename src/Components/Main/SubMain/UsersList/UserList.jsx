import user from  '../../../../assets/user.png';
import UserCard from './UserCard/UserCard';
import { chats } from './chatsOpens';
import './UserList.css';

export default function UserList(){

    return(
        <div className='user-list'>
            <div className='sub-user-list'>
                <UserCard name={'Ramon Ridwan'} status={'online'} img={user} messages={0} />
            </div>
            <div className='open-chats'>
                {chats.map((user)=> {
                    return(
                        <UserCard name={user.name} status={user.status} img={user.img} messages={user.messages} />
                    )
                })}
            </div>
            <div className='new-chat' >
                <button>New chat</button>
            </div>
            
        </div>
    )
}