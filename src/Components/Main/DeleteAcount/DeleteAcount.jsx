import React, { useContext, useState, useEffect} from 'react';
import { AppContext } from '../../../Context/AppContext';
import userPhoto from '../../../assets/user.png';
import '../SubMain/Submain/Submain.css'
import '../Delete/Delete.css';

export default function DeleteAcount({socket}){
    const {user,setLogOut, setUser, setUserList, setToken, setRedirect, setChats,setRoom, setLoading, setUnReadNum} = useContext(AppContext);
    const [password, setPassword] = useState('')
    const tempPass = sessionStorage.getItem('password');

    const handleDelete = ()=>{
        if(password.length > 0 && user._id){
            if(password.toString() === tempPass){
                console.log(user._id, password)
                /* socket.emit("delete_chat", {_id:user._id, password:password}) */
            }
        }
    }

    useEffect(() => {
        const acountDelete = ()=>{
            socket.on("delete_user_res", data=>{
                if(!data.status){
                    return console.log(data.msg,':', data.error)
                }
                
                setLogOut(true)
                setUser({})
                setUserList({})
                setToken({})
                setRedirect(false)
                setChats([])
                setRoom({})
                setLoading(false)
                setUnReadNum([])
                sessionStorage.setItem('password', ``);
                sessionStorage.setItem('email', ``);
                setTimeout(() => {
                    setLogOut(false)
                }, 1000);
            })
        }
        acountDelete();
    }, [setLogOut, setUser, setUserList, setToken, setRedirect, setChats,setRoom, setLoading, setUnReadNum, socket]);

   

    return(
        <div className='sub-main'>
            <div className='sub-main-container' style={{flexDirection: 'column'}} >
                <div className='delete-container'>
                    <div className='delete-title'>
                        <h1>Delete chat</h1>
                    </div>
                    <p>Are you shoure yo want to delete your acount and the chats in it?</p>
                    <div className='delete-chats' style={{overflowX:'unset'}}>
                        <div className='acount-card'>
                            <img src={userPhoto} alt='' />
                            <div>
                                <h3>{user.firstName} {user.lastName}</h3>
                                <h4>{user.email}</h4>
                            </div>
                            
                        </div>
                    </div>
                    <input type='password' className='password' value={password} placeholder='Password' onChange={e=>setPassword(e.target.value)} />
                    
                    <button onClick={handleDelete}  style={{'backgroundColor':'#f50d5ac4'}}>Delete</button>
                    
                </div>    
            </div>
            
            
        </div>
    )
}