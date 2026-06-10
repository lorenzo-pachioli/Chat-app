import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import './LoginBtn.css';


export default function LoginBtn() {
  const { onAuthSuccess } = useOutletContext();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

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
      if (!res.ok || !data.success) {
        setError(true);
        setLoading(false);
        return;
      }
      onAuthSuccess(data.user);
    } catch {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="LoginBtn">
      <div className='form-item'>
        <label>Email</label>
        <div>
          <input type='email' value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
      </div>
      <div className='form-item'>
        <label>Password</label>
        <div>
          <input type='password' value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
      </div>
      {error && <p>Email or password incorrect</p>}
      <button className='submit' onClick={handleLogIn} disabled={loading}>
        {loading ? 'Loading...' : 'Log in'}
      </button>
      <button type='button' className='submit' onClick={() => navigate('/')}>
        Back
      </button>
    </div>
  );
}