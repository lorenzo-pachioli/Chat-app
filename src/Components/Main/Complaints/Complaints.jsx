import axios from 'axios';
import React, { useContext, useState} from 'react';
import { AppContext } from '../../../Context/AppContext';
import '../SubMain/Submain/Submain.css'
import './Complaints.css';

export default function Complaints(){
    const { token,  url, setUrl} = useContext(AppContext);
    const [complaint, setComplaint] = useState('')
    const [complaintError, setComplaintError] = useState(false)

    const handleComplaints = ()=>{
       
        if(token.auth && complaint.length > 0 && url){
            axios.post('https://novateva-codetest.herokuapp.com/complaints',{
            "description": `${complaint}`,
	        "file_64": `${url}`
        },{
            headers:{'Authorization' : `Bearer ${token.auth}`}
        })
        .then(response=> response.status === 200 ? (setComplaint(''), setUrl('')):(setComplaintError(true)))
        .catch(() => setComplaintError(true))

        
        
        }
        
    }

    return(
        <div className='sub-main'>
            <div className='sub-main-container' style={{flexDirection: 'column'}} >
                <div className='comlpaints-container'>
                    <div className='complaints-title'>
                        <h1>Send Complaints</h1>
                    </div>
                    <p className='sub-title'>Here's a screenshot of the chat you want to report</p>
                    <div className='altReport'>
                        {url ? (
                            <img src={url} alt='' />
                        ):(<h3 >No chat reported yet</h3>)}

                    </div>
                   
                    <textarea 
                        value={complaint}
                        onChange={(e)=> setComplaint(e.target.value)}
                        maxLength="200"
                        placeholder='Tell us about the problem' />

                    {url ? (
                        <button onClick={()=>setUrl('')} className='cancel'>Cancel</button>
                    ):(<div className='noButton'></div>)}

                    {complaintError ? (<p className='complaintError'>Couldn't send report</p>):('')}

                    {url && complaint.length > 0 ? (
                        <button onClick={handleComplaints} className='send' >Send</button>
                    ):(<div className='noButton'></div>)}
                    
                </div>
                
            </div>
            
            
        </div>
    )
}