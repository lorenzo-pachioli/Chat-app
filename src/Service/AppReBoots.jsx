// src/Service/AppBootstrap.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import io from 'socket.io-client';
import AppProvider from './AppContext';
import SocketConfig from './SocketConfig';
import App from '../App';
import Loading from '../Pages/Loading/Loading';
import Login from '../Pages/Login/Login';
import LoginBtn from '../Components/Login/Log in/LoginBtn';
import Options from '../Components/Login/Options/Options';
import SignIn from '../Components/Login/Sign in/SignIn';

export default function AppReBoots() {
    const [status, setStatus] = useState('loading');
    const [initialUser, setInitialUser] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const boot = async () => {
            await fetch(`${process.env.REACT_APP_SOCKET_URL}/health`).catch(() => { });

            try {
                const res = await fetch(`${process.env.REACT_APP_SOCKET_URL}/auth/me`, {
                    credentials: 'include'
                });
                const data = await res.json();

                if (data.success) {
                    setInitialUser(data.user);
                    setSocket(io.connect(process.env.REACT_APP_SOCKET_URL, { withCredentials: true }));
                    setTimeout(() => setStatus('authenticated'), 1000);
                    return;
                } else {
                    setTimeout(() => setStatus('unauthenticated'), 1000);
                }
            } catch { }


        };

        console.log("status", status);
        boot();
    }, []);

    const handleAuthSuccess = (user) => {
        setInitialUser(user);
        setSocket(io.connect(process.env.REACT_APP_SOCKET_URL, { withCredentials: true }));
        setStatus('authenticated');
    };

    const handleLogOut = () => {
        setStatus('unauthenticated');
        setInitialUser(null);
        setSocket(null);
    };

    // Mantenemos la pantalla de carga aislada al inicio
    if (status === 'loading') return <Loading />;

    return (
        <BrowserRouter>
            <Routes>
                {/* RUTAS PÚBLICAS (No autenticado) */}
                {status === 'unauthenticated' && (
                    <Route path="/" element={<Login onAuthSuccess={handleAuthSuccess} />}>
                        <Route index element={<Options />} />
                        <Route path="signin" element={<SignIn />} />
                        <Route path="login" element={<LoginBtn onAuthSuccess={handleAuthSuccess} />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                )}

                {/* RUTAS PRIVADAS (Autenticado) */}
                {status === 'authenticated' && (
                    <Route path="*" element={
                        <AppProvider initialSocket={socket} initialUser={initialUser} onLogOut={handleLogOut}>
                            <App />
                            <SocketConfig />
                        </AppProvider>
                    } />
                )}
            </Routes>
        </BrowserRouter>
    );
}
