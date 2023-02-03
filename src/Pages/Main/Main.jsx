import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../Service/AppContext';
import ControlPanel from '../../Components/Main/ControlPanel/ControlPanel';
import { Navigate } from "react-router-dom";
import './Main.css';
import { Outlet } from 'react-router-dom';

export default function Main() {

    const { user, setRedirect, setLoading } = useContext(AppContext);

    useEffect(() => {
        setLoading(false)
        setRedirect(false);
    }, [setRedirect, setLoading]);

    return (
        <div className='main' >
            <ControlPanel />
            <Outlet />
            {user._id ? ('') : (<Navigate to='/login' replace={true} />)}
        </div>
    )
}
