import React, {useContext} from 'react';
import { AppContext } from '../../Context/AppContext';
import userPhoto from '../../assets/user.png';
import bell from '../../assets/bell.svg';
import searchIcon from '../../assets/search-icon.svg';
import './TopBar.css';

export default function TopBar(){

    const {user, unReadNum} = useContext(AppContext);

    const UnRead = ()=>{
        if(unReadNum.length > 0){
            const unread = unReadNum.filter((chat)=> chat.unRead > 0 );
            if(unread.length > 0){
                return<span className='dot'>{ unread.length}</span>
            }
            
        }
        
    }

    return(
        <div className='top-bar'>
            <div className='user-search'>
                <div className='sub-user-search'>
                    <img src={searchIcon} alt='' />
                    <input type='text' placeholder='User search' />
                </div>
                
            </div>
            <div className='user'>
                
                <div>
                    <img src={userPhoto} alt='' />
                    <p>{user ? (`${user.firstName + ' ' + user.lastName}`):('no user')}</p>
                </div>
                
                <button>
                    <img src={bell} alt='' />
                    <UnRead />
                </button>
                
            </div>
        </div>
    )
}