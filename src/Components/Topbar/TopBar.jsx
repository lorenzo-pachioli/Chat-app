import user from '../../assets/user.png';
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
                
                <button>C</button>
                
            </div>
        </div>
    )
}