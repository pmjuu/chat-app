import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ref, get } from "firebase/database";
import db from "../app/firebase";
import styled from "styled-components";
import { startChatting } from "../features/chattingSlice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  background-color: white;
  border: 1px solid #ededed;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);
  transition: 0.3s all ease;
  margin: 10px 0;
  padding: 3px;
  width: 300px;

  :hover {
    cursor: pointer;
    color: white;
    background-color: rgb(89, 127, 188);
  }

  img {
    margin-right: 5px;
    height: 50px;
    width: 50px;
    border: 1px solid #ededed;
    border-radius: 50%;
  }

  .chat-info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 5px;
    width: 150px;
  }

  .chat-info span {
    margin: 3px;
  }

  .timestamp {
    text-align: right;
  }
`;

export default function Chat({ chatId }) {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    get(ref(db, `chats/${chatId}`)).then(snapshot => setChatInfo(snapshot.val()));
  }, []);

  function handleChatClick() {
    dispatch(startChatting({ currentUserId: chatInfo.userId, currentChatId: chatId }));
  }

  const user = useSelector(state => state.user[chatInfo?.userId]);

  if (chatInfo) {
    get(ref(db, `chats/${chatId}/messages`)).then(snapshot => {
      const messages = snapshot.val();
      const lastMessageId = Object.keys(chatInfo.messages).at(-1);
      setLastMessage(messages[lastMessageId]);
    });
  }

  return (
    <Wrapper onClick={handleChatClick}>
      <div>
        <img src={user?.imageURL} alt="profile image" />
      </div>
      <div className="chat-info">
        <span>{user?.name}</span>
        <p>{lastMessage?.text}</p>
      </div>
      <div className="timestamp">
        {lastMessage?.createdAt.slice(0,16)}
      </div>
    </Wrapper>
  );
}
