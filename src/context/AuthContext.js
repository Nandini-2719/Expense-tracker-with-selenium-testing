// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        localStorage.setItem('userEmail', user.email); // Store email in local storage
      } else {
        localStorage.removeItem('userEmail'); // Clear email from local storage if not logged in
      }
    });
    return unsubscribe;
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('userEmail', userData.email); // Store email in local storage
  };

  const logout = () => {
    auth.signOut();
    setUser(null);
    localStorage.removeItem('userEmail'); // Clear email from local storage
  };

  // Retrieve email from local storage if user is not available in state
  const userEmail = user?.email || localStorage.getItem('userEmail');

  return (
    <AuthContext.Provider value={{ user, login, logout, userEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
