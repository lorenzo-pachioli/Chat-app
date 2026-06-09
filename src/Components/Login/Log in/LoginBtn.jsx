import { useState, useEffect, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { AppContext } from '../../../Service/AppContext';
import sessionStoragedCredentials from '../../../utils/sessionStoragedCredentials';
import { useOutletContext } from 'react-router-dom';
import './LoginBtn.css';

export default function LoginBtn() {

  const {
    user,
    redirect,
    setRedirect,
    loading,
    setLoading,
    userList,
    socket
  } = useContext(AppContext);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const { onAuthSuccess } = useOutletContext();
  const navigate = useNavigate();

  const credentials = useMemo(() => new sessionStoragedCredentials(), []);

  const handleLogIn = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`${process.env.REACT_APP_SOCKET_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) onAuthSuccess(data.user);

      if (!res.ok || !data.success) {
        setError(true);
        setLoading(false);
        return;
      }
      credentials.setEmail(form.email);
      credentials.setPassword(form.password.toString());
      socket.emit("log_in", { ...form, online: true }); // conectar socket post-auth
    } catch {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    const redirect = () => {
      if (user._id && userList.length > 0) {
        setRedirect(true)
      }
    }
    redirect();
  }, [user, setRedirect, userList]);


  return (
    <div className="LoginBtn" value={form} >
      <div className='form-item'>
        <label>Email</label>
        <div>
          <input type='email' name="email" value={form.email} onChange={(e) => setForm({ ...form, email: `${e.target.value}` })} />
        </div>

      </div>
      <div className='form-item'>
        <label>Password</label>
        <div>
          <input
            type='password' name='password' value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value.toString() })} />
        </div>
      </div>
      {error ? (<p>Email or password incorrect</p>) : ('')}

      <button type='submit' className='submit' onClick={handleLogIn} disabled={loading}>
        {loading ? ('Loading...') : ('Log in')}
      </button>

      <button type='button' className='submit' onClick={() => navigate('/')}>
        Back
      </button>
      {redirect ? (<Navigate to='/chatapp' replace={true} />) : ('')}
    </div>
  );
}
