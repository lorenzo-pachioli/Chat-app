import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import InputSyntax from './InputSyntax/InputSyntax';
import { nameValidate, passwordValidate } from './InputSyntax/regExFunctions';
import '../Log in/LoginBtn.css';

export default function SignIn() {
  const [redirectLogIn, setRedirectLogIn] = useState(false);
  const [nameDisplay, setNameDisplay] = useState('none');
  const [lastNameDisplay, setlastNameDisplay] = useState('none');
  const [passwordDisplay, setPasswordDisplay] = useState('none');
  const [nameBoder, setNameBoder] = useState(true);
  const [lastNameBorder, setLastNameBorder] = useState(true);
  const [passwordBorder, setPasswordBorder] = useState(true);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_SOCKET_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return console.log('Error en signup:', data);
      }
      setRedirectLogIn(true);
    } catch (err) {
      console.log(`Error signing up: ${err}`);
    }
  };

  const handleName = (e) => {
    setForm({ ...form, firstName: `${e.target.value}` });
    setNameBoder(nameValidate(e.target.value));
  }

  const handleLastName = (e) => {
    setForm({ ...form, lastName: `${e.target.value}` })
    setLastNameBorder(nameValidate(e.target.value));
  }

  const handlePassword = (e) => {
    setForm({ ...form, password: e.target.value.toString() });
    setPasswordBorder(passwordValidate(e.target.value));
  }


  return (
    <div className="LoginBtn" value={form} >
      <div className='form-item'>
        <label>Name</label>
        <div style={{ background: nameBoder ? ('linear-gradient(178.18deg, #FD749B -13.56%, #281AC8 158.3%)') : ('rgba(255, 30, 0, 0.664)') }}>
          <input
            type='text'
            name="Name"
            value={form.name}
            onFocus={() => setNameDisplay('flex')}
            onBlur={() => setNameDisplay('none')}
            onChange={(e) => handleName(e)} />
          <InputSyntax inputName='name' style={{ display: `${nameDisplay}` }} />
        </div>
      </div>
      <div className='form-item'>
        <label>Last name</label>
        <div style={{ background: lastNameBorder ? ('linear-gradient(178.18deg, #FD749B -13.56%, #281AC8 158.3%)') : ('rgba(255, 30, 0, 0.664)') }}>
          <input
            type='text'
            name="lastName"
            value={form.lastName}
            onFocus={() => setlastNameDisplay('flex')}
            onBlur={() => setlastNameDisplay('none')}
            onChange={(e) => handleLastName(e)} />
          <InputSyntax inputName='lastName' style={{ display: `${lastNameDisplay}` }} />
        </div>
      </div>
      <div className='form-item'>
        <label>Email</label>
        <div>
          <input
            type='email'
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: `${e.target.value}` })} />
        </div>
      </div>
      <div className='form-item'>
        <label>Password</label>
        <div style={{ background: passwordBorder ? ('linear-gradient(178.18deg, #FD749B -13.56%, #281AC8 158.3%)') : ('rgba(255, 30, 0, 0.664)') }}>
          <input
            type='password'
            name='password'
            value={form.password}
            onFocus={() => setPasswordDisplay('flex')}
            onBlur={() => setPasswordDisplay('none')}
            onChange={(e) => handlePassword(e)} />
          <InputSyntax inputName='password' style={{ display: `${passwordDisplay}` }} />
        </div>
      </div>
      <button type='submit' className='submit' onClick={handleSignIn}>Sign in</button>
      {redirectLogIn ? (<Navigate to='/login' replace={true} />) : ('')}

      <button type='button' className='submit' onClick={() => navigate('/')}>
        Back
      </button>

    </div>
  );
}