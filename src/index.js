import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import AppProvider from './Service/AppContext';
import SocketConfig from './Service/SocketConfig';
import env from 'react-dotenv';
import io from 'socket.io-client';

export const socket = io.connect(env.SOCKET_URL);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Router >
			<AppProvider >
				<App />
				<SocketConfig />
			</AppProvider>
		</Router>
	</React.StrictMode>
);
