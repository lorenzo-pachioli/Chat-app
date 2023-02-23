import React, { useMemo, useState } from "react";
import { socket as initSocket } from "..";
import sessionStoragedCredentials from "../utils/sessionStoragedCredentials";
export const AppContext = React.createContext();

export default function AppProvider({ children }) {

  const credentials = useMemo(() => new sessionStoragedCredentials(), []);

  const [user, setUser] = useState({});
  const [userList, setUserList] = useState({});
  const [token, setToken] = useState({});
  const [chats, setChats] = useState([]);
  const [room, setRoom] = useState({});
  const [redirect, setRedirect] = useState(credentials.email && credentials.password ? (true) : (false));
  const [loading, setLoading] = useState(false);
  const [logOut, setLogOut] = useState(false);
  const [newChat, setNewChat] = useState(false);
  const [unReadNum, setUnReadNum] = useState([]);
  const [url, setUrl] = useState('');
  const [socket, setSocket] = useState(initSocket);
  const [deleteChat, setDelete] = useState('');


  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        chats,
        setChats,
        room,
        setRoom,
        userList,
        setUserList,
        redirect,
        setRedirect,
        loading,
        setLoading,
        logOut,
        setLogOut,
        newChat,
        setNewChat,
        unReadNum,
        setUnReadNum,
        url,
        setUrl,
        socket,
        setSocket,
        deleteChat,
        setDelete
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
