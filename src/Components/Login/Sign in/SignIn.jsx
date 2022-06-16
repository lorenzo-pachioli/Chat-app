import React, { useState, useEffect} from 'react';
import { Navigate} from "react-router-dom";
import '../Log in/LoginBtn.css';

export default function SignIn({socket}) {

  const [redirectLogIn, setRedirectLogIn] = useState(false);
  const [form, setForm] = useState({
    name:'',
    lastName:'',
    email:'',
    password: ''
  })

  const handleSignIn = async ()=>{
    try{
      const newUser = {
        email: `${form.email}`,
        password: `${form.password}`,
        firstName: `${form.name}`,
        lastName: `${form.lastName}`
      }
      await socket.emit("sign_up", newUser)
    }catch(err){
      console.log(`Error signing up, error: ${err}`)
    }
  }

  useEffect(() => {
    const redirect = async ()=>{
      await socket.on("sign_up_res", data =>{
        if(!data.status){
          return console.log(`${data.msg}: ${data.error}`)
        }
        setRedirectLogIn(true)
      })
    }
    redirect();
    setTimeout(() => {
      setRedirectLogIn(false)
    });
  }, [socket]);

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
          <button type='submit' className='submit' onClick={handleSignIn}>Sign in</button>
          {redirectLogIn ? (<Navigate to='/login' replace={true} />):('')}
        </div>
  );
}