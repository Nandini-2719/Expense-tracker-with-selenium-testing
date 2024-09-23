// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  };

  const buttonStyle = {
    padding: '20px 40px',
    fontSize: '24px',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: '#333',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const hoverStyle = {
    backgroundColor: '#555',
  };

  return (
    <div style={containerStyle}>
      {!clicked && (
        <div>
          <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Expense Tracker</h1>
          <div style={{ textAlign: 'center' }}>
            <Link to="/login" style={buttonStyle} onClick={handleClick} onMouseEnter={(e) => e.target.style.backgroundColor = '#555'} onMouseLeave={(e) => e.target.style.backgroundColor = '#333'}>
              Login
            </Link>
            <Link to="/register" style={{ ...buttonStyle, marginLeft: '20px' }} onClick={handleClick} onMouseEnter={(e) => e.target.style.backgroundColor = '#555'} onMouseLeave={(e) => e.target.style.backgroundColor = '#333'}>
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
