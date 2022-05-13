import React, {useState} from 'react';
import { Navigate } from "react-router-dom";
import axios from "axios";

import './LoginBtn.css';


export default function LoginBtn() {

  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    email:'',
    password: ''
  })

  const handleLogIn = ()=>{
    axios.post('https://novateva-codetest.herokuapp.com/login', {
      'email' : `${form.email}`,
      'password' : `${form.password}`
    })
    .then(response => response.status === 200 ? (setRedirect(true)):(setError(true)))
    .catch(error => setError(true))
  }

  return (
      <div className="LoginBtn" value={form} >
        <div className='form-item'>
          <label>Email</label>
          <div>
            <input type='email' name="email" value={form.email} onChange={(e)=>setForm({...form, email:`${e.target.value}`})} />
          </div>

        </div>
        <div className='form-item'>
          <label>Password</label>
          <div>
            <input type='password' name='password' value={form.password} onChange={(e)=>setForm({...form, password:`${e.target.value}`})} />
          </div>
        </div>
        {/* <p style={{display:`${error ? ('block'):('none')}`}}>Email or password incorrect</p> */}
        {error ? (<p>Email or password incorrect</p>):('')}
         
        <button type='submit' className='submit' onClick={handleLogIn}>Log in</button>
        {redirect ? (<Navigate to='/chatapp' replace={true} />):('')}
      </div>
  );
}