import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../Service/AppContext';
import userPhoto from '../../../assets/user.png';
import '../../../Pages/SubMain/SubMain.css';
import './Settings.css';
import '../Delete/Delete.css';

export default function Settings() {

    const { user, socket } = useContext(AppContext);
    const [userToUpdate, setUserToUpdate] = useState({ ...user, password: "" });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(false);
    }, [userToUpdate.password, confirmPassword]);

    const handleUpdate = () => {
        if (!user._id) return;
        if (userToUpdate.password.length > 0) {
            if (userToUpdate.password !== confirmPassword) return setError(true);
            socket.emit("upadate_user", userToUpdate);
        } else {
            socket.emit("upadate_user", userToUpdate);
        }
    }

    return (
        <div className='sub-main'>
            <div className='sub-main-container' style={{ flexDirection: 'column' }} >
                <div className='delete-container'>
                    <div className='delete-title'>
                        <h1>Settings</h1>
                    </div>
                    <div className='user_item'>
                        <label>First name</label>
                        <input
                            type='text'
                            className='password'
                            value={userToUpdate.firstName}
                            placeholder='First name'
                            onChange={e => setUserToUpdate(u => ({ ...u, firstName: e.target.value }))}
                        />
                    </div>
                    <div className='user_item'>
                        <label>Last name</label>
                        <input
                            type='text'
                            className='password'
                            value={userToUpdate.lastName}
                            placeholder='Last name'
                            onChange={e => setUserToUpdate(u => ({ ...u, lastName: e.target.value }))}
                        />
                    </div>
                    <div className='user_item'>
                        <label>Email</label>
                        <input
                            type='text'
                            className='password'
                            value={userToUpdate.email}
                            placeholder='Email'
                            onChange={e => setUserToUpdate(u => ({ ...u, email: e.target.value }))}
                        />
                    </div>
                    <div className='user_item'>
                        <label>Password</label>
                        <input
                            type='password'
                            className='password'
                            value={userToUpdate.password}
                            placeholder='Password'
                            onChange={e => setUserToUpdate(u => ({ ...u, password: e.target.value }))}
                        />
                    </div>
                    <div className='user_item'>
                        <label>Confirm password</label>
                        <input
                            type='password'
                            className='password'
                            value={confirmPassword}
                            placeholder='Password'
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                        {error ? (<p>Passwords are diferent</p>) : ('')}
                    </div>
                    <button onClick={handleUpdate} style={{ 'backgroundColor': '#f50d5ac4' }}>Update</button>
                </div>
            </div>
        </div>
    )
}