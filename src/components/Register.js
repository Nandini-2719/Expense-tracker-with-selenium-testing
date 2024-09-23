import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      login(userCredential.user); // Login user immediately after registration
      navigate('/expense'); // Redirect to expense page
    } catch (error) {
      setError(error.message); // Set error message state
      console.error('Error registering:', error);
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
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleRegister}>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          Register
        </button>
        {error && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</p>} {/* Display error message */}
      </form>
    </div>
  );
};

export default Register;
