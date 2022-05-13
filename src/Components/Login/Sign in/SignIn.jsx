import React, {useEffect, useState} from 'react';
import { Navigate} from "react-router-dom";
import axios from "axios";

import '../Log in/LoginBtn.css';


export default function SignIn() {

  const [redirect, setRedirect] = useState(false);
  const [form, setForm] = useState({
    name:'',
    lastName:'',
    email:'',
    password: ''
  })

  const handleLogIn = ()=>{
    axios.post('https://novateva-codetest.herokuapp.com/users', {
      'email' : `${form.email}`,
      'password' : `${form.password}`,
      "firstName": `${form.name}`,
      "lastName": `${form.lastName}`,
      "type": "consumer" ,
    })
    .then(response => response.status === 200 ? (setRedirect(true)):(''))
  }

  return (
    <div className="LoginBtn" value={form} >
        <div className='form-item'>
          <label>Name</label>
          <div>
            <input type='text' name="Name" value={form.name} onChange={(e)=>setForm({...form, name:`${e.target.value}`})} />
          </div>
        </div>
        <div className='form-item'>
          <label>Last name</label>
          <div>
            <input type='text' name="lastName" value={form.lastName} onChange={(e)=>setForm({...form, lastName:`${e.target.value}`})} />
          </div>
        </div>
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
          <button type='submit' className='submit' onClick={handleLogIn}>Sign in</button>
          {redirect ? (<Navigate to='/chatapp' replace={true} />):('')}
        </div>
  );
}