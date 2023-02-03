import { useContext, useEffect, useMemo, useRef } from "react";
import sessionStoragedCredentials from "../utils/sessionStoragedCredentials";
import { AppContext } from "./AppContext";
import env from 'react-dotenv';
import io from 'socket.io-client';

const socket = io.connect(env.SOCKET_URL);

export default function SocketConfig() {

  const {
    user,
    setUser,
    chats,
    setChats,
    room,
    setRoom,
    setUserList,
    loading,
    setLoading,
    setSocket
  } = useContext(AppContext);

  const credentials = useMemo(() => new sessionStoragedCredentials(), []);
  const refUser = useRef(user);
  const refChats = useRef(chats);
  const userId = user._id;
  const refUsersList = useRef([]);
  const refRoom = useRef(room);

  //connection status
  useEffect(() => {

    socket.on('connect', () => {
      setSocket(socket);
      console.log('connect')
    });
    socket.on('disconnect', () => console.log('disconnect'));
  }, [setSocket]);

  //log in
  useEffect(() => {

    socket.on("log_in_res", (socketResponce) => {
      if (!socketResponce.status) return console.error(socketResponce.msg, ':', socketResponce.error);

      if (!refUser.current._id && refChats.current.length === 0) {
        credentials.setEmail(socketResponce.user.email);
        setUser(socketResponce.user);
        setChats(socketResponce.rooms);
        refUser.current = socketResponce.user;
        refChats.current = socketResponce.rooms
      }
    });
  }, [setUser, setChats, credentials]);

  //On page re load set user
  useEffect(() => {

    const tempEmail = credentials.email;
    const tempPass = credentials.password;
    const onReload = () => {

      if (loading) return;
      if (user._id === undefined && tempEmail && tempPass) {
        socket.emit("log_in", {
          email: tempEmail,
          password: tempPass,
          online: true
        }).catch(err => console.log(`Something went wrong on reloading page, error: ${err}`));
      }
    }
    onReload();
  }, [user, loading, credentials]);

  //get users list
  useEffect(() => {

    socket.on("get_users_res", socketResponce => {
      if (!socketResponce.status) return console.log(socketResponce.msg, ':', socketResponce.error);
      setUserList(socketResponce.users);
    });
  }, [setUserList]);

  //users online
  useEffect(() => {

    socket.on("online_res", socketResponce => {
      if (!socketResponce.status) return console.log(socketResponce.msg, ':', socketResponce.error);
      if (refUsersList.current.length > 0) {
        const newUserList = refUsersList.current.map(user => user._id === socketResponce.user._id ? (socketResponce.user) : (user));
        setUserList(newUserList);
      }
    });
  }, [setUserList]);

  //delete user response
  useEffect(() => {

    const userDeletedHasRoom = (userDeletedId) => refRoom.current.users.some(uid => uid === userDeletedId);

    socket.on("delete_user_res", (socketResponce) => {
      if (!socketResponce.status) return console.log(socketResponce.msg, ':', socketResponce.error);
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
  }, [setLoading, setUser, setChats, userId, setUserList, setRoom, credentials]);
}
