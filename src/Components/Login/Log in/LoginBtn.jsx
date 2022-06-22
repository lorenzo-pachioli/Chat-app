import React, {useState, useEffect, useContext} from 'react';
import { Navigate } from "react-router-dom";
import { AppContext } from '../../../Context/AppContext';

import './LoginBtn.css';


export default function LoginBtn({socket}) {

  const {user, redirect, setRedirect,  loading, setLoading,  setLogOut} = useContext(AppContext);
  

  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    email:'',
    password: ''
  })


  useEffect(() => {
    setLogOut(false)
  }, [setRedirect, setLogOut]);

  useEffect(() => {
    const errorLogIn = ()=>{
      socket.on("log_in_res", (data) => {
        if(!data.status ){
          return setError(true);
        }
      })
    }
    errorLogIn();
  }, [socket]);


  const handleLogIn = async ()=>{
    setLoading(true);
    if(form.email && !sessionStorage.getItem('email') && !sessionStorage.getItem('password')){
      console.log('log in')
      socket.emit("log_in", form)
    }
  }

  useEffect(() => {
    const redirect = ()=>{
      if(user._id){
        setRedirect(true)
      }
    }
    redirect();
  }, [user, setRedirect]);
  

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
        {error ? (<p>Email or password incorrect</p>):('')}
         
        <button type='submit' className='submit' onClick={handleLogIn} disabled={loading}>
          {loading ? ('Loading...'):('Log in')}
          </button>
        {redirect ? (<Navigate to='/chatapp' replace={true} />):('')}
      </div>
  );
}