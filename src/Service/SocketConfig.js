import { useContext, useEffect, useMemo, useRef } from "react";
import sessionStoragedCredentials from "../utils/sessionStoragedCredentials";
import { AppContext } from "./AppContext";
import { socket } from "..";

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
    setSocket,
    setLogOut,
    setToken,
    setRedirect,
    setUnReadNum,
    deleteChat,
    setDelete,
    redirect
  } = useContext(AppContext);

  const credentials = useMemo(() => new sessionStoragedCredentials(), []);
  const refUser = useRef(user);
  const refChats = useRef(chats);
  const userId = user._id;
  const refUsersList = useRef([]);
  const refRoom = useRef(room);
  const dateFrom = (date) => new Date(date).getTime();

  // connection status ---------------------------------------------------------------------------------------
  socket.on('connect', () => {
    setSocket(socket);
    console.log('connect')
  });
  socket.on('disconnect', () => {
    console.log('disconnect')
  });

  // log in response -----------------------------------------------------------------------------------------
  useEffect(() => {
    socket.on("log_in_res", (socketResponce) => {

      if (!socketResponce.status) return console.error(socketResponce.msg, ':', socketResponce.error);

      if (socketResponce.user) {
        credentials.setEmail(socketResponce.user.email);
        setUser(socketResponce.user);
        setChats(socketResponce.rooms);
        setRedirect(false);
        refUser.current = socketResponce.user;
        refChats.current = socketResponce.rooms;
      }
    });
  }, [credentials, setChats, setUser, setRedirect]);


  // On page re load set user  --------------------------------------------------------------------------------
  useEffect(() => {
    const tempEmail = credentials.email;
    const tempPass = credentials.password;
    const onReload = () => {

      if (loading) return;
      if (!redirect) return;
      if (user._id === undefined && tempEmail && tempPass) {
        try {
          socket.emit("log_in", {
            email: tempEmail,
            password: tempPass,
            online: true
          })
        } catch (err) {
          console.log(`Something went wrong on reloading page, error: ${err}`)
        }
      }
    }
    onReload();
  }, [credentials, user, loading, redirect]);


  // get users list response ------------------------------------------------------------------------------------------
  useEffect(() => {
    socket.on("get_users_res", socketResponce => {
      if (!socketResponce.status) return console.log(socketResponce.msg, ':', socketResponce.error);
      setUserList(socketResponce.users);
    });
  }, [setUserList]);


  // users online response --------------------------------------------------------------------------------------------
  useEffect(() => {
    socket.on("online_res", socketResponce => {

      if (!socketResponce.status) return console.log(socketResponce.msg, ':', socketResponce.error);
      if (refUsersList.current.length > 0) {
        const newUserList = refUsersList.current.map(user => user._id === socketResponce.user._id ? (socketResponce.user) : (user));
        setUserList(newUserList);
      }
    });
  }, [setUserList]);

  // Message sent response ----------------------------------------------------------------------------------
  useEffect(() => {
    socket.on("send_msg_res", async data => {

      if (!data.status) {
        return console.log(data.msg, ':', data.error);
      }
      setChats((chat) => chat.map((c) => c._id === data.room._id ? (data.room) : (c)))
      await data.room.messages.sort((a, b) => { return dateFrom(a.time) < dateFrom(b.time) });
      setRoom(r => r._id === data.room._id ? (data.room) : (r));
    });
  }, [setChats, setRoom]);

  // messages set read response -------------------------------------------------------------------------------------
  useEffect(() => {
    socket.on("read_msg_res", async data => {

      if (!data.status) {
        return console.log(data.msg, ':', data.error);
      }
      await data.room.messages.sort((a, b) => { return dateFrom(a.time) < dateFrom(b.time) });
      setRoom(r => r._id === data.room._id ? (data.room) : (r));
      setChats((chat) => chat.map((c) => c._id === data.room._id ? (data.room) : (c)));
    })
  }, [setChats, setRoom]);

  //chat initiated response -----------------------------------------------------------------------------------
  useEffect(() => {
    socket.on("init_room_res", data => {
      if (!data.status) {
        return console.log(data.msg, ':', data.error);
      };
      if (data.otherUser === userId) {
        socket.emit("join_room", { _id: userId, room_id: data.room._id });
      }
      if (data.room.users.find(id => id === userId)) {
        setChats(chat => {
          if (chat.some(c => c._id === data.room._id)) {
            return chat;
          }
          return [...chat, data.room]
        });
      }
    });
  }, [setChats, userId]);


  // delete message response ---------------------------------------------------------------------------------
  useEffect(() => {
    socket.on("delete_msg_res", data => {
      if (!data.status) {
        return console.log(data.msg, ':', data.error);
      }
      setRoom(data.room);
      setChats((chat) => chat.map((c) => c._id === data.room._id ? (data.room) : (c)));
    });
  }, [setChats, setRoom]);

  // delete chat response -----------------------------------------------------------------------------------
  useEffect(() => {
    socket.on("delete_chat_res", data => {
      if (!data.status) {
        return console.log(data.msg, ':', data.error);
      }
      setChats(chat => chat.filter((chat) => chat._id !== deleteChat));
      setRoom({});
      setDelete('');
    });
  }, [deleteChat, setChats, setRoom, setDelete]);


  //delete user response -------------------------------------------------------------------------------------
  useEffect(() => {
    const userDeletedHasRoom = (userDeletedId) => refRoom.current.users && refRoom.current.users.some(uid => uid === userDeletedId);

    socket.on("delete_user_res", (socketResponce) => {

      if (!socketResponce.status) return console.log(socketResponce.msg, ':', socketResponce.error);
      if (socketResponce.userDeleted._id === userId) {
        setLoading(false);
        setUser({});
        setLogOut(true);
        setUserList({});
        setToken({});
        setRedirect(false);
        setChats([]);
        setRoom({});
        setUnReadNum([]);
        credentials.deleteCredentials();
        setTimeout(() => {
          setLogOut(false);
        }, 1000);
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
  }, [
    credentials,
    setChats,
    setLoading,
    setLogOut,
    setRedirect,
    setRoom,
    setToken,
    setUnReadNum,
    setUser,
    setUserList,
    userId
  ]);
}
