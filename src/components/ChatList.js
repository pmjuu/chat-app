import styled from "styled-components";
import { db } from "../app/firebase";
import { ref, query, orderByChild, onValue } from "firebase/database";

import Chat from "./Chat";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
  const [userIdList, setUserIdList] = useState(null);
  const userState = useSelector(state => state.user);

  useEffect(() => {
    const orderedRef = query(ref(db, 'chats'), orderByChild('lastMessage/createdAt/total'));
    onValue(orderedRef, snapshot => {
      const orderedUserIds = [];
      snapshot.forEach(item => {
        orderedUserIds.push(item.val().userId);
      });
      setUserIdList(orderedUserIds.reverse());
    });
  }, [])

  useEffect(() => {
    if (userIdList) {
      const chatIds = [];
      userIdList.forEach(id => {
        chatIds.push(userState[id].chatId);
      });
      setChatIdList(chatIds);
    }
  }, [userIdList])

  return (
    <Wrapper>
      {chatIdList?.map(id => <Chat key={id} chatId={id} />)}
    </Wrapper>
  );
}
