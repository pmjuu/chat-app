import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ref, set, get, push, query, orderByChild } from "firebase/database";
import { orderBy } from "firebase/firestore";
import db from "../app/firebase";
import styled from "styled-components";
import Message from "./Message";
import { endChatting } from "../features/chattingSlice";
import { format } from "date-fns";

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

export default function ChattingPage() {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.chatting.userId);
  const chatId = useSelector(state => state.chatting.chatId);
  const userName = useSelector(state => state.user[userId].name);

  const [messageIdList, setMessageIdList] = useState(null);

  useEffect(() => {
    get(ref(db, `chats/${chatId}/messages`)).then(snapshot => {
      if (snapshot.exists()) setMessageIdList(Object.keys(snapshot.val()));
    }).catch(error => console.error(error));
  }, []);

  const [newText, setNewText] = useState("");

  function handleMessageChange(e) {
    setNewText(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const newTime = new Date();
      const newMessage = {
        createdAt: format(newTime, "yyyy-MM-dd HH:mm:ss"),
        text: newText,
        userId: "itsme",
      };
      push(ref(db, 'messages'), newMessage);
      push(ref(db, `chats/${chatId}/messages`), newMessage);
      setNewText("");

      // push(ref(db, 'messages'), newMessage).then(pushedRef => {
      //   const pushedId = JSON.stringify(pushedRef).slice(-21, -1);
      //   set(ref(db, `chats/${chatId}/messages/${pushedId}`), newMessage);
      // });
    } catch (error) {
      console.log("Error adding document", error);
    }

    get(ref(db, `chats/${chatId}/messages`)).then(snapshot => {
      setMessageIdList(Object.keys(snapshot.val()));
    }).catch(error => console.error(error));


  }

  return (
    <Wrapper>
      <div>
        <button onClick={() => dispatch(endChatting())}>Close</button>
      </div>
      <div>
        <h1>Chat with {userName}</h1>
      </div>
      <div className="message-list">
        {messageIdList && messageIdList.map(id => <Message key={id} messageId={id} chatId={chatId} />)}
      </div>
      <form onSubmit={handleSubmit}>
        <input value={newText} onChange={handleMessageChange} placeholder="type your message"/>
        <button type="submit">Send</button>
      </form>
    </Wrapper>
  );
}
