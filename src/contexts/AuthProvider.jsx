import { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const initialToken = JSON.parse(localStorage.getItem('token')) || '';
  const initialUser = JSON.parse(localStorage.getItem('user')) || {};
  const [token, setToken] = useState(initialToken);
  const [userData, setUserData] = useState(initialUser);
  const [isLoggedIn, setIsLoggedIn] = useState(!!initialToken);

  const userId = token ? jwtDecode(token).userId : '';

  const setUserSession = ({ user, token }) => {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify(user));
    setIsLoggedIn(true);
    setUserData(user);
    setToken(token);
  };

  const clearUserSession = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserData({});
    setToken('');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userData,
        token,
        userId,
        setUserSession,
        clearUserSession,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
