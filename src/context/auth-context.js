import { createContext } from 'react';
import jwt from 'jsonwebtoken';

export const AuthContext = createContext({
  user: {
    id: 0,
    username: '',
    role: ''
  },
  isLoggedIn: false,
  setAuth() { },
});

export const getToken = () => localStorage.getItem('token') || '';

export const getUser = () => {
  try {
    const tokenFromStorage = getToken();
    // TODO: Check if token is valid;
    return jwt.decode(tokenFromStorage);
  } catch {
    return null;
  }
};
