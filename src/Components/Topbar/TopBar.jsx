import user from '../../assets/user.png';
import bell from '../../assets/bell.svg';
import './TopBar.css';

export default function TopBar(){

    return(
        <div className='top-bar'>
            <div className='user-search'>
                <input type='text' placeholder='User search' />
            </div>
            <div className='user'>
                
                <div>
                    <img src={user} alt='' />
                    <p>Ramon Ridwan</p>
                </div>
                
                <button>
                    <img src={bell} alt='' />
                </button>
                
            </div>
        </div>
    )
}