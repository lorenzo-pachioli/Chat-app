import React, { useEffect, useContext, useRef, useMemo } from 'react';
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
import { AppContext } from './Context/AppContext';
import io from 'socket.io-client';
import sessionStoragedCredentials from './utils/sessionStoragedCredentials';
import env from 'react-dotenv';
import './App.css';

const socket = io.connect(env.SOCKET_URL);

function App() {

	const { user, loading, setLoading, chats, setChats, setUser, userList, setUserList, room, setRoom } = useContext(AppContext);
	const userId = user._id;
	const credentials = useMemo(() => new sessionStoragedCredentials(), []);
	const refChats = useRef(chats);
	const refUser = useRef(user);
	const refUsersList = useRef([]);
	const refRoom = useRef(room);

	useEffect(() => {
		refUsersList.current = userList;
	}, [userList]);

	//log in
	useEffect(() => {

		const logIn = async () => {

			socket.on("log_in_res", (socketResponce) => {
				if (!socketResponce.status) {
					return console.error(socketResponce.msg, ':', socketResponce.error)
				}

				if (!refUser.current._id && refChats.current.length === 0) {
					credentials.setCredentialsEmail(socketResponce.user.email);
					setUser(socketResponce.user);
					setChats(socketResponce.rooms);
					refUser.current = socketResponce.user;
					refChats.current = socketResponce.rooms
				}
			});
		}

		logIn();
	}, [setUser, setChats, credentials]);

	//On page re load set user
	useEffect(() => {

		const tempEmail = credentials.Credentials.email;
		const tempPass = credentials.Credentials.password;

		const onReload = () => {
			if (loading) {
				return;
			}

			if (user._id === undefined && tempEmail && tempPass) {
				try {
					socket.emit("log_in", {
						email: tempEmail,
						password: tempPass,
						online: true
					});
				} catch (err) {
					console.log(`Something went wrong on reloading page, error: ${err}`)
				}
			}
		}

		onReload()
	}, [user, loading, credentials]);

	//log out 
	useEffect(() => {

		const logOut = () => {
			socket.on('disconnect', socketResponce => {
				return console.log('disconnect', socketResponce)
			});
		}

		const connect = () => {
			socket.on('connect', socketResponce => {
				return console.log('connect', socketResponce)
			});
		}

		connect();
		logOut();
	}, [user]);

	//get users list

	useEffect(() => {

		const getUser = () => {

			socket.on("get_users_res", socketResponce => {
				if (!socketResponce.status) {
					return console.log(socketResponce.msg, ':', socketResponce.error)
				}
				setUserList(socketResponce.users);
			});
		}

		getUser();
	}, [setUserList]);

	//users online

	useEffect(() => {

		const onlineUser = () => {

			socket.on("online_res", socketResponce => {
				if (!socketResponce.status) {
					return console.log(socketResponce.msg, ':', socketResponce.error)
				}
				if (refUsersList.current.length > 0) {
					const newUserList = refUsersList.current.map(user => user._id === socketResponce.user._id ? (socketResponce.user) : (user));
					setUserList(newUserList);
				}
			});
		}

		onlineUser();
	}, [setUserList]);

	//delete user response

	useEffect(() => {

		const userDeletedHasRoom = (userDeletedId) => {
			return refRoom.current.users.some(uid => uid === userDeletedId)
		}

		const userDeleted = () => {

			socket.on("delete_user_res", (socketResponce) => {
				if (!socketResponce.status) {
					return console.log(socketResponce.msg, ':', socketResponce.error)
				}
				if (socketResponce.userDeleted._id === userId) {
					setLoading(false);
					setUser({});
					credentials.deleteCredentials();
					return;
				}
				setUserList(socketResponce.users);
				if (refChats.current.length > 0) {
					const newChats = refChats.current.filter(chat => !chat.users.some(u => u === socketResponce.userDeleted._id));
					setChats(newChats);
				}
				if (userDeletedHasRoom(socketResponce.userDeleted._id)) {
					refRoom.current = {};
					setRoom({});
				}
			});
		}

		userDeleted();
	}, [setLoading, setUser, setChats, userId, setUserList, setRoom, credentials]);

	return (
		<div className="App">
			<Routes>
				<Route>
					<Route path="chatapp" element={<ChatApp socket={socket} />} >
						<Route path="complaints" element={<Complaints socket={socket} />} />
						<Route path="delete" element={<Delete socket={socket} />} />
						<Route path="deleteAcount" element={<DeleteAcount socket={socket} />} />
						<Route path="" element={<SubMain socket={socket} />} />
					</Route>
				</Route>
				<Route>
					<Route exact path="/" element={<Login />} >
						<Route path="signin" element={<SignIn socket={socket} />} />
						<Route path="login" element={<LoginBtn socket={socket} />} />
						<Route path="" element={<Options />} />
					</Route>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
