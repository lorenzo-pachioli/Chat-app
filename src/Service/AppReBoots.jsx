// src/Service/AppBootstrap.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import io from 'socket.io-client';
import AppProvider from './AppContext';
import SocketConfig from './SocketConfig';
import App from '../App';
import Loading from '../Pages/Loading/Loading';
import Login from '../Pages/Login/Login';

export default function AppReBoots() {
    const [status, setStatus] = useState('loading'); // 'loading' | 'unauthenticated' | 'authenticated'
    const [initialUser, setInitialUser] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const boot = async () => {
            await fetch(`${process.env.REACT_APP_API_URL}/health`).catch(() => { });

            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/me`, {
                    credentials: 'include'
                });
                const data = await res.json();
                if (data.success) {
                    setInitialUser(data.user);
                    setSocket(io.connect(process.env.REACT_APP_SOCKET_URL));
                    setStatus('authenticated');
                    return;
                }
            } catch { }

            setStatus('unauthenticated');
        };

        boot();
    }, []);

    const handleAuthSuccess = (user) => {
        setInitialUser(user);
        setSocket(io.connect(process.env.REACT_APP_SOCKET_URL));
        setStatus('authenticated');
    };

    if (status === 'loading') return <Loading />;

    if (status === 'unauthenticated') return <Login onAuthSuccess={handleAuthSuccess} />;

    return (
        <Router>
            <AppProvider initialSocket={socket} initialUser={initialUser}>
                <App />
                <SocketConfig />
            </AppProvider>
        </Router>
    );
}