import React, {useEffect, useContext} from 'react';
import { AppContext } from '../../../Context/AppContext';
import ControlPanel from '../ControlPanel/ControlPanel';
import './Main.css';
import { Outlet } from 'react-router-dom';

export default function Main(){
    const { setRedirect,redirect, setLoading} = useContext(AppContext);

    useEffect(() => {
        setLoading(false)
        setRedirect(false);
        
    }, [setRedirect, setLoading]);
    console.log('2', redirect)

    return(
        <div className='main'>
            <ControlPanel />
            <Outlet />
            
        </div>
    )
}