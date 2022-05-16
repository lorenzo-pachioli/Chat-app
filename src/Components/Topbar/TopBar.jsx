import userPhoto from '../../assets/user.png';
import bell from '../../assets/bell.svg';
import searchIcon from '../../assets/search-icon.svg';
import './TopBar.css';

export default function TopBar({user}){
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
                    <span className='dot'>24</span>
                    
                </button>
                
            </div>
        </div>
    )
}