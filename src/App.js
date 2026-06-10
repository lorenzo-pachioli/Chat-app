import React, { useEffect, useContext, useRef } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import ChatApp from './Pages/ChatApp/ChatApp';
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
				<Route path="/chatapp" element={<ChatApp />}>
					<Route path="complaints" element={<Complaints />} />
					<Route path="delete" element={<Delete />} />
					<Route path="deleteAcount" element={<DeleteAcount />} />
					<Route path="" element={<SubMain />} />
				</Route>
				<Route path="*" element={<Navigate to="/chatapp" replace />} />
			</Routes>
		</div>
	);
}

export default App;
