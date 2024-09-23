import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import ExpenseDialog from './components/ExpenseDialog';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [headerVisible, setHeaderVisible] = useState(true);

  const handleLinkClick = () => {
    setHeaderVisible(false);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {headerVisible && (
            <header className="App-header">
              <div className="header-container">
                <h1>Expense Tracker</h1>
                <nav>
                  <ul className="nav-links">
                    <li><Link to="/login" onClick={handleLinkClick}>Login</Link></li>
                    <li><Link to="/register" onClick={handleLinkClick}>Register</Link></li>
                  </ul>
                </nav>
              </div>
            </header>
          )}
          <main className="App-main">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/expense" element={<ProtectedRoute element={<ExpenseDialog />} />} />

            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
