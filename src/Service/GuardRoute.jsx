import React, { useContext, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '../Pages/Loading/Loading';
import sessionStoragedCredentials from '../utils/sessionStoragedCredentials';
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
  const credentials = useMemo(() => new sessionStoragedCredentials(), []);

  if (credentials.email && credentials.password) {
    return (
      user._id || logOut
        ? element
        : <Loading />)
  } else {
    return <Navigate to='/' replace={true} />
  }
};
