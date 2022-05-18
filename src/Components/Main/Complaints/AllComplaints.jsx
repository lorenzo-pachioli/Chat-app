import axios from 'axios';
import React, { useContext, useState, useEffect} from 'react';
import { AppContext } from '../../../Context/AppContext';
import moment from 'moment';
import html2canvas from "html2canvas";
import '../SubMain/Submain/Submain.css'
import './Complaints.css';

export default function AllComplaints(){
    const { token} = useContext(AppContext);
    const [complaint, setComplaint] = useState('')
    const [complaintList, setComplaintList] = useState([])

    useEffect(() => {
        if(token.auth ){
            axios.get('https://novateva-codetest.herokuapp.com/complaints',{
            headers:{'Authorization' : `Bearer ${token.auth}`}
        })
        .then(response=> setComplaintList(response.data.complaints))
        .catch(error=>console.error(error))
        }
        
    }, [setComplaintList,token]);


    const handleComplaints = ()=>{
        if(token.auth && complaint.length > 0){
            axios.post('https://novateva-codetest.herokuapp.com/complaints',{
            "description": `${complaint}`,
	        "file_64": "file64"
        },{
            headers:{'Authorization' : `Bearer ${token.auth}`}
        })
        .then(response=> complaintList.push(response.data.user))
        .catch(error=>console.error(error))

        setComplaint('')
        }
    }

    return(
        <div className='sub-main'>
            <div className='sub-main-container' style={{flexDirection: 'column'}} >
                <div className='comlpaints-container'>
                    <div className='complaints-title'>
                        <h1>All Complaints</h1>
                    </div>
                    
                    <div className='complaints'>
                        {
                            complaintList.length > 0 ? (
                                complaintList.map((comp)=>{
                                    return(
                                        <div className='complaint-card' key={comp._id}>
                                            <p className='date'>{moment(comp.createdAt).format("MMM Do YY")}</p>
                                            <h3>Complaint</h3>
                                            <p className='description'>{comp.description}</p>
        
                                        </div>
                                    )
                                })
                            ):(
                                <h3>No comlpaints made yet</h3>
                            )
                        }
                   </div> 
                </div>
                
                
            </div>
            
            
        </div>
    )
}