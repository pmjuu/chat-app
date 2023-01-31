import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import db from "../app/firebase";
import styled from "styled-components";
import Message from "./Message";
import { addMessage } from "../features/chatSlice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  background-color: white;
  border: 1px solid #ededed;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);
  padding: 3px;
`;

export default function ChattingPage({ chatId, onClose }) {
  const dispatch = useDispatch();
  const chat = useSelector(state => state.chat[chatId]);
  const originalMessageList = chat.messageIds;
  const userName = useSelector(state => state.user[chat.userId].name);

  // const messageIdList = chat.messageIds;
  const [messageIdList, setMessageIdList] = useState(originalMessageList);

  const [newMessage, setNewMessage] = useState("");

  function handleMessageChange(e) {
    setNewMessage(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newDoc = {
      text: newMessage,
      userId: "itsme",
      createdAt: Timestamp.fromDate(new Date())
    }

    try {
      const docRef = await addDoc(collection(db, "messages"), {
        text: newMessage,
        userId: "itsme",
        createdAt: Timestamp.fromDate(new Date())
      });
      const newId = docRef.id;
      // dispatch(addMessage({ chatId, newId }));
      // set(ref(db, 'chats/eThePYVY8OuYVlowzean/messages' + newId), {
      //   text: newMessage,
      //   userId: "itsme",
      //   createdAt: Timestamp.fromDate(new Date())
      // });

      setNewMessage("");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.log("Error adding document", e);
    }
  }

  return (
    <Wrapper>
      <div>
        <button onClick={onClose}>Close</button>
      </div>
      <div>
        <h1>Chat with {userName}</h1>
      </div>
      <div className="message-list">
        {messageIdList.map(id => <Message key={id} messageId={id} />)}
      </div>
      <form onSubmit={handleSubmit}>
        <input value={newMessage} onChange={handleMessageChange} placeholder="type your message"/>
        <button type="submit">Send</button>
      </form>
    </Wrapper>
  );
}
