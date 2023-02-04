import styled from "styled-components";
import { db } from "../app/firebase";
import { ref, get, query, orderByChild } from "firebase/database";

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
    const orderByLastMessageTimestamp = query(ref(db, 'chats'), orderByChild('lastMessage/createdAt/total'));
    get(orderByLastMessageTimestamp).then(snapshot => {
      const orderedUserIds = [];
      snapshot.forEach(item => {
        orderedUserIds.push(item.val().userId);
      });
      setUserIdList(orderedUserIds.reverse());
    }).catch(error => console.error(error));
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
