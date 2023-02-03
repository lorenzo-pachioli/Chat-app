import React, { useContext } from 'react';
import { AppContext } from '../../../Service/AppContext';
import { Link, Navigate } from "react-router-dom";
import logout from '../../../assets/logout.svg';
import chat from '../../../assets/chat-bubble.svg';
import customerService from '../../../assets/customer-service.svg';
import deleteMsg from '../../../assets/delete-message.svg';
import deleteAcount from '../../../assets/delete-person.svg';
import sessionStoragedCredentials from '../../../utils/sessionStoragedCredentials';
import './ControlPanel.css';

export default function ControlPanel({ socket }) {

    const { user, logOut, setLogOut, unReadNum, setUser, setUserList, setToken, setRedirect, setChats, setRoom, setLoading, setUnReadNum } = useContext(AppContext);
    const credentials = new sessionStoragedCredentials();
    const menu = [
        {
            label: 'Chat',
            route: '',
            img: chat,
            unRead: true
        }, {
            label: 'Complaints',
            route: '/complaints',
            img: customerService,
            unRead: false
        }, {
            label: 'Delete chat',
            route: '/delete',
            img: deleteMsg,
            unRead: false
        }, {
            label: 'Delete acount',
            route: '/deleteAcount',
            img: deleteAcount,
            unRead: false
        },
    ];

    const handleLogOut = async () => {
        const password = credentials.password;
        try {
            await socket.emit("online", { email: user.email, password: password, online: false });
            setLogOut(true);
            setUser({});
            setUserList({});
            setToken({});
            setRedirect(false);
            setChats([]);
            setRoom({});
            setLoading(false);
            setUnReadNum([]);
            credentials.deleteCredentials();
            setTimeout(() => {
                setLogOut(false)
            }, 1000);
        } catch (err) {
            console.error(`Error: ${err}`)
        }
    }

    const UnRead = () => {
        if (unReadNum.length > 0) {
            const unread = unReadNum.filter((chat) => chat.unRead.length > 0);
            if (unread.length > 0) {
                return (
                    <div>
                        <p className='sub-num'>{unread.length}</p>
                    </div>
                )
            }
        }
    }

    const MenuItem = ({ route = '', img, label = '', unRead = false }) => {
        return (
            <Link to={`/chatapp${route}`} className='chat-message'>
                <div>
                    <img src={img} fill='white' alt='' />
                    <p>{label}</p>
                </div>

                <div className='num' style={{ display: unRead ? 'block' : 'none' }}>
                    <UnRead />
                </div>
            </Link>
        )
    }

    return (
        <div className='control-panel'>
            <div className='sub-control-panel'>
                {
                    menu.map(item => {
                        return <MenuItem key={item.label} label={item.label} route={item.route} img={item.img} unRead={item.unRead} />
                    })
                }
            </div>
            <div className='logout-container'>
                <button className='logout' onClick={handleLogOut}>
                    <img src={logout} alt='' />
                    <p>Loggout</p>
                </button>
                <hr />
            </div>
            {logOut ? (<Navigate to='/' replace={true} />) : ('')}
        </div>
    )
}
