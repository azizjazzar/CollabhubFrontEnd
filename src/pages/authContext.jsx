import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [authData, setAuthData] = useState(() => {
    const storedAuthData = localStorage.getItem('authData');
    return storedAuthData ? JSON.parse(storedAuthData) : {
      user: { email: '' },
      accessToken: null,
      refreshToken: null,
      userMeeting: null,
    };
  });

  const setAuthUserData = ({ user, userMeeting, accessToken, refreshToken }) => {
    setAuthData(previousData => {
      const newData = {
        ...previousData,
        user: user,
        userMeeting: userMeeting,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      localStorage.setItem('authData', JSON.stringify(newData));
      return newData;
    });
  };

  const refreshAuthData = (updatedData) => {
    setAuthData(previousData => ({
      ...previousData,
      ...updatedData,
    }));
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
