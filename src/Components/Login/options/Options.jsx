import React from 'react';
import { Link } from "react-router-dom";
import './Options.css';


export default function Options() {

  

  return (
    <div className="Options">
        <Link to="/signin" className='link' > Sign in </Link>
        <Link to="/login" className='link' > Log in </Link>
    </div>
  );
}