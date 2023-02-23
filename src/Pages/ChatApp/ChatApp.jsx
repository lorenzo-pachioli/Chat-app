import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../Service/AppContext';
import TopBar from '../../Components/Topbar/TopBar';
import Main from '../Main/Main';
import './ChatApp.css';

export default function ChatApp() {
	const { user, chats, setUnReadNum } = useContext(AppContext);

	//All un read messages amount
	useEffect(() => {

		const unRead = chats.map((chat) => {
			const unreadMsj = chat.messages.filter((msj) => {
				if (msj.readBy.length > 1 || msj.readBy.some((u) => u === user._id)) {
					return false
				}
				return true;
			});
			return { chatId: chat._id, unRead: unreadMsj }
		});

		setUnReadNum(unRead)
	}, [chats, user, setUnReadNum]);

	return (
		<div className="ChatApp">
			<TopBar />
			<Main />
		</div>
	);
}
