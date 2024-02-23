import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [authData, setAuthData] = useState(() => {
    const storedAuthData = localStorage.getItem('authData');
    return storedAuthData ? JSON.parse(storedAuthData) : {
      user: { email: '' }, 
      accessToken: null,
      refreshToken: null,
    };
  });

  const setAuthUserData = ({ user, accessToken, refreshToken }) => {
    const newAuthData = { user, accessToken, refreshToken };
    setAuthData(newAuthData);
    localStorage.setItem('authData', JSON.stringify(newAuthData));
  };


  const refreshAuthData = (updatedData) => {
    setAuthUserData(updatedData);
  };

  return (
    <AuthContext.Provider value={{ authData, setAuthUserData, refreshAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
