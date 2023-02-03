import React, { useState } from 'react';
import { socket } from '..';
import Loading from '../Pages/Loading/Loading';

function GuardedRoute({ element: Component, auth = false }) {

  const [socketConnected, setSocketConnected] = useState(false);

  socket.on('connect', () => {
    setSocketConnected(socket.connected);
  });

  return (
    socketConnected || auth
      ? <Component />
      : <Loading />)
}

export default GuardedRoute;