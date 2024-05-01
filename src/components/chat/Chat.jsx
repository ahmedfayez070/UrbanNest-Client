import "./chat.scss";
import { useContext, useEffect, useRef, useState } from "react";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
// import { SocketContext } from "../../context/SocketContext";
// import { useNotificationStore } from "../../lib/notificationStore";

const Chat = ({ chats }) => {
  const [chat, setChat] = useState(null);

  const { currentUser } = useContext(AuthContext);
  // const { socket } = useContext(SocketContext);

  // const decrease = useNotificationStore((state) => state.decrease);

  const messageEndRef = useRef();

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest.get("/chats/" + id);
      if (!res.data.seenBy.includes(currentUser.id)) {
        // decrease();
      }
      setChat({ ...res.data, receiver });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");
    if (!text) return;

    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      // socket.emit("sendMessage", {
      //   receiverId: chat.receiver.id,
      //   data: res.data,
      // });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const read = async () => {
  //     await apiRequest.put("chats/read/" + chat.id);
  //   };

  //   if (chat && socket) {
  //     socket.on("getMessage", (message) => {
  //       if (chat.id === message.chatId) {
  //         setChat((prev) => ({
  //           ...prev,
  //           messages: [...prev.messages, message],
  //         }));
  //         read();
  //       }
  //     });
  //   }

  //   return () => {
  //     socket.off("getMessage");
  //   };
  // }, [chat, socket]);

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats?.map((c) => (
          <div
            className="message"
            onClick={() => handleOpenChat(c.id, c.receiver)}
            key={c.id}
            style={{
              backgroundColor:
                c.seenBy.includes(currentUser.id) || chat?.id === c.id
                  ? "#fff"
                  : "#fecd514e",
            }}
          >
            <img src={c.receiver.avatar || "/noavatar.jpg"} alt="user" />
            <span>{c.receiver.username}</span>
            <p>{c.lastMessage}</p>
          </div>
        ))}
      </div>
      {chat && (
        <div className="box">
          <div className="top">
            <div className="user">
              <img src={chat.receiver.avatar || "/noavatar.jpg"} alt="user" />
              <span>{chat.receiver.username}</span>
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="mid">
            {chat.messages?.map((message) => (
              <div
                className={
                  message.userId === currentUser.id
                    ? "message owner"
                    : "message"
                }
                key={message.id}
              >
                <p>{message.text}</p>
                <span>{moment(message.createdAt).fromNow()}</span>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
          <form className="bottom" onSubmit={handleSubmit}>
            <input type="text" placeholder="Write a message" name="text" />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
