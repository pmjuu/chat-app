import { useEffect, useState } from "react";
import { ref, query, orderByChild, onValue } from "firebase/database";
import { db } from "../app/firebase";
import styled from "styled-components";
import Chat from "./Chat";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  max-width: 400px;
  height: 85vh;
`;

export default function ChatList() {
  const [chatIdList, setChatIdList] = useState(null);

  useEffect(() => {
    const orderedRef = query(ref(db, 'chats'), orderByChild('lastMessage/createdAt/total'));
    onValue(orderedRef, snapshot => {
      const orderedChatIds = [];
      snapshot.forEach(item => {
        orderedChatIds.push(item.key);
      });
      setChatIdList(orderedChatIds.reverse());
    });
  }, [])

  return (
    <Wrapper>
      {chatIdList?.map(id => <Chat key={id} chatId={id} />)}
    </Wrapper>
  );
}
