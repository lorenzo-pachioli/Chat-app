import React, { useEffect, useContext, useRef } from 'react';
import { Route, Routes } from "react-router-dom";
import ChatApp from './Pages/ChatApp/ChatApp';
import Login from './Pages/Login/Login';
import LoginBtn from './Components/Login/Log in/LoginBtn';
import Options from './Components/Login/Options/Options';
import SignIn from './Components/Login/Sign in/SignIn';
import Complaints from './Components/Main/Complaints/Complaints';
import Delete from './Components/Main/Delete/Delete';
import DeleteAcount from './Components/Main/DeleteAcount/DeleteAcount';
import SubMain from './Pages/SubMain/SubMain';
import { AppContext } from './Service/AppContext';
import './App.css';

function App() {

	const { userList } = useContext(AppContext);
	const refUsersList = useRef([]);

	useEffect(() => {
		refUsersList.current = userList;
	}, [userList]);

	return (
		<div className="App">
			<Routes>
				<Route>
					<Route path="chatapp" element={<ChatApp />} >
						<Route path="complaints" element={<Complaints />} />
						<Route path="delete" element={<Delete />} />
						<Route path="deleteAcount" element={<DeleteAcount />} />
						<Route path="" element={<SubMain />} />
					</Route>
				</Route>
				<Route>
					<Route exact path="/" element={<Login />} >
						<Route path="signin" element={<SignIn />} />
						<Route path="login" element={<LoginBtn />} />
						<Route path="" element={<Options />} />
					</Route>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
