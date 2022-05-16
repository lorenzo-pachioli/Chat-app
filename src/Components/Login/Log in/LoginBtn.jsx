import React, {useState, useEffect, useContext} from 'react';
import { Navigate } from "react-router-dom";
import { AppContext } from '../../../Context/AppContext';
import axios from "axios";

import './LoginBtn.css';


export default function LoginBtn() {

  const {token, setToken, redirect, loading, setLoading, setRedirect, setLogOut} = useContext(AppContext);

  
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    email:'',
    password: ''
  })
  useEffect(() => {
    setRedirect(false)
    setLogOut(false)
  }, [setRedirect, setLogOut]);

  const handleLogIn = ()=>{
    setLoading(true);
    axios.post('https://novateva-codetest.herokuapp.com/login', {
      'email' : `${form.email}`,
      'password' : `${form.password}`
    })
    .then(response => response.status === 200 ? (setToken({...token,email:form.email, auth:response.data.authorization})):(setError(true)))
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
         
        <button type='submit' className='submit' onClick={handleLogIn}>
          {loading ? ('Loading...'):('Log in')}
          </button>
        {redirect ? (<Navigate to='/chatapp' replace={true} />):('')}
      </div>
  );
}