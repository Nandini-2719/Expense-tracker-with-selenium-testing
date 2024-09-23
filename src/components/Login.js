import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      login(userCredential.user);
      navigate('/expense'); // Redirect to expense page
    } catch (error) {
      setError(error.message);
      console.error('Error logging in:', error);
    }
  };

  return (
    <div style={{
      maxWidth: '300px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#fff',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            marginBottom: '10px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '3px'
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            marginBottom: '10px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '3px'
          }}
          required
        />
        <button
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
        {error && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
