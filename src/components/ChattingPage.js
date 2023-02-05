import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../app/firebase";
import { ref, push, query, orderByChild, onValue } from "firebase/database";
import { Timestamp } from "firebase/firestore";
import styled from "styled-components";
import Message from "./Message";
import { endChatting } from "../features/chattingSlice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  max-width: 500px;
  height: 100vh;
  padding: 3px;
  background-color: rgb(35, 35, 35);

  .chattingPage-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 5vh;
  }

  .title {
    width: 100%;
    color: white;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .message-list {
    width: 100%;
    max-height: 85vh;
    margin: 5px 0;
    overflow: scroll;
  }

  form {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100%;
    background-color: rgb(70, 70, 70);
    position: sticky;
    top: 95vh;
  }

  form .input-text {
    width: 70vw;
    min-height: 20px;
    border: 1px solid #ededed;
    outline: none;
    resize: none;
  }

  .button-default {
    margin: 5px;
    padding: 5px 10px;
    font-size: 1rem;
    color: rgb(122, 173, 255);
    background-color: white;
    border: 1px solid #ededed;
    border-radius: 5px;
    transition: 0.3s all ease;

    :hover {
      background-color: rgb(122, 173, 255);
      color: white;
      cursor: pointer;
    }
  }

  .search {
    width: 30px;
    height: 1.2rem;
    margin: 5px;
  }
`;

export default function ChattingPage() {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.chatting.userId);
  const chatId = useSelector(state => state.chatting.chatId);
  const currentUser = useSelector(state => state.login);
  const [name, setName] = useState("");
  const [newText, setNewText] = useState("");
  const [messageIdList, setMessageIdList] = useState([]);
  const textRef = useRef();

  useEffect(() => {
    onValue(ref(db, `users/${userId}`), snapshot => {
      setName(snapshot.val().name);
    });
  }, []);

  const orderedRef = query(ref(db, `chats/${chatId}/messages`), orderByChild('createdAt/total'));
  useEffect(() => {
    onValue(orderedRef, snapshot => {
      const orderedMessageIds = [];
      snapshot.forEach(item => {
        orderedMessageIds.push(item.key);
      });

      setMessageIdList(orderedMessageIds);
    });
  }, []);

  function handleTextChange(e) {
    if (e.target.value === '\n') return setNewText("");
    setNewText(e.target.value);
    textRef.current.style.height = 'auto';
    textRef.current.style.height = textRef.current.scrollHeight + 'px';
  }

  function onEnterPress(e) {
    if (e.key === 'Enter' && e.shiftKey === false) {
      setNewText("");
      handleSubmit();
    }
  }

  function handleSubmit(e) {
    e?.preventDefault();

    try {
      const newTimestamp = Timestamp.fromDate(new Date());
      const newTotal = (newTimestamp.seconds)*1000 + (newTimestamp.nanoseconds)/1000000;
      const newMessage = {
        createdAt: {...newTimestamp, total: newTotal},
        text: newText,
        userId: currentUser.userId,
      };

      push(ref(db, `chats/${chatId}/messages`), newMessage);
      setNewText("");
      textRef.current.style.height = 'auto';
    } catch (error) {
      console.log("Error adding message data", error);
    }
  }

  const [searchKeyword, setSearchKeyword] = useState("");
  function searchMessage(e) {
    setSearchKeyword(e.target.value);
  }

  return (
    <Wrapper>
      <div className="chattingPage-header">
        <button className="button-default" onClick={() => dispatch(endChatting())}>↩</button>
        <span className="title">{name}</span>
        <input className="search" onChange={searchMessage} placeholder="🔍" />
      </div>
      <div className="message-list">
        {messageIdList?.map(id => <Message key={id} messageId={id} chatId={chatId} />)}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea className="input-text" value={newText} onChange={handleTextChange} ref={textRef} onKeyDown={onEnterPress} placeholder="type your message" rows={1} />
        <button className="button-default" type="submit">Send</button>
      </form>
    </Wrapper>
  );
}
