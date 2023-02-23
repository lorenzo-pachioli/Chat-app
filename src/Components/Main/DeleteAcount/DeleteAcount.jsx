import React, { useContext, useState } from 'react';
import { AppContext } from '../../../Service/AppContext';
import userPhoto from '../../../assets/user.png';
import '../../../Pages/SubMain/SubMain.css';
import '../Delete/Delete.css';

export default function DeleteAcount() {

    const { user, socket } = useContext(AppContext);
    const [password, setPassword] = useState('');

    const handleDelete = () => {
        if (password.length > 0 && user._id) {
            socket.emit("delete_user", { email: user.email, password: password });
        }
    }

    return (
        <div className='sub-main'>
            <div className='sub-main-container' style={{ flexDirection: 'column' }} >
                <div className='delete-container'>
                    <div className='delete-title'>
                        <h1>Delete acount</h1>
                    </div>
                    <p>Are you shoure yo want to delete your acount and the chats in it?</p>
                    <div className='delete-chats' style={{ overflowX: 'unset' }}>
                        <div className='acount-card'>
                            <img src={userPhoto} alt='' />
                            <div>
                                <h3>{user.firstName} {user.lastName}</h3>
                                <h4>{user.email}</h4>
                            </div>
                        </div>
                    </div>
                    <input type='password' className='password' value={password} placeholder='Password' onChange={e => setPassword(e.target.value)} />
                    <button onClick={handleDelete} style={{ 'backgroundColor': '#f50d5ac4' }}>Delete</button>
                </div>
            </div>
        </div>
    )
}