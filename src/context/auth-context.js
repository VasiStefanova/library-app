import { createContext } from 'react';
import jwt from 'jsonwebtoken';
import fetchRequest from '../requests/server-requests';

export const AuthContext = createContext({
  user: {
    id: 0,
    username: '',
    role: ''
  },
  isLoggedIn: false,
  isBanned: false,
  setAuth() { },
});

export const getToken = () => localStorage.getItem('token') || '';

let userInfo = null;

export const getDecodedUser = () => {
  let result = null;
  const tokenFromStorage = getToken();
  if (tokenFromStorage) {
    result = jwt.decode(tokenFromStorage);
  }

  return result;
};

export const clearUser = () => {
  userInfo = null;
};

export const getUser = async () => {
  if (!userInfo) {
    try {
      const decodedUser = getDecodedUser();
      if (decodedUser) {
        const user = await fetchUserInfo(decodedUser.sub);
        userInfo = {
          user,
          isLoggedIn: true,
          isBanned: user.banstatus?.banned
        };
      }
    } catch {
      userInfo = null;
    }
  }

  return userInfo;
};

export const fetchUserInfo = (userId) => {

  const args = {
    path: `users/${userId}`,
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
    handler: data => data
  };

  return fetchRequest(args);
};

