import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {

    if (username === 'yusif' && password === 'yusif123') {
      dispatch(login());
      navigate('/home'); 
    } else {
      setError('Kullanıcı adı veya parola yanlış.');
    }
  };

  return ( 
    <div className='login'>
      <h1>Login Page</h1>

      <div className='input-box'>
        <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
        <i className='bx bxs-user'></i>
      </div>

      <div className='input-box'>
        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <i className='bx bxs-lock-alt'></i>
      </div>

      <div className='forgot'>
        <label>
          <input type="checkbox" /> Remember me
        </label>
        <a href="">Forgot password</a>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className='btn' onClick={handleLogin}>Login</button>
      <div className="register">
            <p>Don't have an account? <a href="">Register</a></p>
        </div>
    </div>
  );
};

export default LoginPage;
