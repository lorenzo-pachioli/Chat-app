import SubMain from '../SubMain/Submain/SubMain';
import ControlPanel from '../ControlPanel/ControlPanel';
import './Main.css';

export default function Main(){

    return(
        <div className='main'>
            <ControlPanel />
            <SubMain />
            
        </div>
    )
}