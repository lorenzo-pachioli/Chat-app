import React, { useContext } from 'react';
import Loading from '../Pages/Loading/Loading';
import { AppContext } from './AppContext';

export function ConnectionGuard({ element }) {

  const { socket } = useContext(AppContext);

  return (
    socket
      ? element
      : <Loading />)
};


export function AuthGuard({ element }) {

  const { user, logOut } = useContext(AppContext);

  return (
    user._id || logOut
      ? element
      : <Loading />)
};