import user from '../../assets/user.png';
import bell from '../../assets/bell.svg';
import searchIcon from '../../assets/search-icon.svg';
import './TopBar.css';

export default function TopBar(){

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
                    <img src={user} alt='' />
                    <p>Ramon Ridwan</p>
                </div>
                
                <button>
                    <img src={bell} alt='' />
                    <span className='dot'>24</span>
                    
                </button>
                
            </div>
        </div>
    )
}