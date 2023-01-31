import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import db from "../app/firebase";
import styled from "styled-components";

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
`;

export default function Chat({ chatId, onChattingStart }) {
  const chatState = useSelector(state => state.chat);
  const currentUserId = chatState[chatId].userId;
  const lastMessageId = chatState[chatId].messageIds.at(-1);

  const currentUserInfo = useSelector(state => state.user[currentUserId]);
  const { id, imageURL, name } = currentUserInfo;

  const [lastMessage, setLastMessage] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "messages", lastMessageId), (doc) => {
      const { createdAt, text, userId } = doc.data();
      const stringCreatedAt = JSON.stringify(createdAt.toDate()).slice(1, 17).replace("T", " ");
      setLastMessage({ id: doc.id, createdAt: stringCreatedAt, text: text, userId: userId });
    });
  }, []);

  return (
    <Wrapper onClick={() => {onChattingStart(chatId)}}>
      <div>
        <img src={imageURL} alt="profile image" />
      </div>
      <div className="chat-info">
        <span>{name}</span>
        <p>{lastMessage.text}</p>
      </div>
      <div>
        {lastMessage.createdAt}
      </div>
    </Wrapper>
  );
}
