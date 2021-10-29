import { createContext } from 'react';
import jwt from 'jsonwebtoken';

export const AuthContext = createContext({
  user: {
    id: 0,
    username: '',
  },
  isLoggedIn: false,
  setAuth() { },
});

export const getToken = () => localStorage.getItem('token') || '';

export const getUser = () => {
  // console.log('getUser called');
  try {
    const tokenFromStorage = getToken();
    // console.log(jwt.decode(tokenFromStorage));
    // TODO: Check if token is valid;
    return jwt.decode(tokenFromStorage);
  } catch {
    return null;
  }
};
