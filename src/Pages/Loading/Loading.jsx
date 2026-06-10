import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Loading.css';

export default function Loading() {

	const [toLogin] = useState(false);

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
