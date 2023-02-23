import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../../Service/AppContext';
import './Loading.css';

export default function Loading() {

	const [toLogin, setToLogin] = useState(false);
	const { user } = useContext(AppContext);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setToLogin(true);
		}, 6000);
		if (user._id) return clearTimeout(timeout);
	}, [user]);

	return (
		<div className="Login">
			<div className='subLogin'>
				<div className='title'>
					<h1>Pachioli Chat</h1>
					<h1>Loading... </h1>
				</div>
				{toLogin ? <Navigate to='/' replace={true} /> : ''}
			</div>
		</div>
	);
}
