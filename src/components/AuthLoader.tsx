'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, setAuthLoaded } from '@/store/slices/user';

export const AuthLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (token && username) {
      dispatch(login({ token, username, loggedIn: true }));
    } else {
      dispatch(setAuthLoaded());
    }
  }, []);

  return null;
};
