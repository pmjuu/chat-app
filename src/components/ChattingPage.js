import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../app/firebase";
import { ref, set, get, push, query, orderByChild } from "firebase/database";
import { Timestamp } from "firebase/firestore";
import styled from "styled-components";
import Message from "./Message";
import { endChatting } from "../features/chattingSlice";

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

  .button-default {
    margin: 5px;
    padding: 5px 10px;
    font-size: 1em;
    color: rgb(122, 173, 255);
    background-color: white;
    border: 1px solid #ededed;
    border-radius: 5px;
    transition: 0.3s all ease;
  }

  .button-default:hover {
    color: white;
    background-color: rgb(122, 173, 255);
    cursor: pointer;
  }
`;

export default function ChattingPage() {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.chatting.userId);
  const chatId = useSelector(state => state.chatting.chatId);
  const userName = useSelector(state => state.user[userId].name);

  const [messageIdList, setMessageIdList] = useState(null);

  useEffect(() => {
    get(ref(db, `chats/${chatId}/messages`), orderByChild('/lastMessage/createdAt/total')).then(snapshot => {
      setMessageIdList(Object.keys(snapshot.val()));
    }).catch(error => console.error(error));
  }, []);

  const [newText, setNewText] = useState("");

  function handleMessageChange(e) {
    setNewText(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const newTimestamp = Timestamp.fromDate(new Date());
      const newTotal = (newTimestamp.seconds)*1000 + (newTimestamp.nanoseconds)/1000000;
      const newMessage = {
        createdAt: {...newTimestamp, total: newTotal},
        text: newText,
        userId: "itsme",
      };

      push(ref(db, `chats/${chatId}/messages`), newMessage);
      set(ref(db, `chats/${chatId}/lastMessage`), newMessage);
      setNewText("");
    } catch (error) { console.log("Error adding document", error) }

    get(ref(db, `chats/${chatId}/messages`)).then(snapshot => {
      setMessageIdList(Object.keys(snapshot.val()));
    }).catch(error => console.error(error));
  }

  return (
    <Wrapper>
      <div>
        <button onClick={() => dispatch(endChatting())} className="button-default">Close</button>
      </div>
      <div>
        <h1>Chat with {userName}</h1>
      </div>
      <div className="message-list">
        {messageIdList && messageIdList.map(id => <Message key={id} messageId={id} chatId={chatId} />)}
      </div>
      <form onSubmit={handleSubmit}>
        <input value={newText} onChange={handleMessageChange} placeholder="type your message"/>
        <button type="submit" className="button-default">Send</button>
      </form>
    </Wrapper>
  );
}
