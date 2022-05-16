import React, {useEffect, useContext} from 'react';
import { AppContext } from '../../../Context/AppContext';
import SubMain from '../SubMain/Submain/SubMain';
import ControlPanel from '../ControlPanel/ControlPanel';
import './Main.css';

export default function Main(){
    const { setRedirect, setLoading} = useContext(AppContext);

    useEffect(() => {
        setLoading(false)
        setRedirect(false);
    }, [setRedirect, setLoading]);

    return(
        <div className='main'>
            <ControlPanel />
            <SubMain />
            
        </div>
    )
}