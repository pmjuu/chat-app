import styled from "styled-components";
import db from "../app/firebase";
import { ref, get, query, orderByChild } from "firebase/database";

import Header from "./Header";
import Chat from "./Chat";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function ChatList() {
  const [chatIdList, setChatIdList] = useState(null);
  const [userIdList, setUserIdList] = useState(null);
  const userState = useSelector(state => state.user);

  useEffect(() => {
    const ordered = query(ref(db, 'chats'), orderByChild('lastMessage/createdAt/total'));
    get(ordered).then(snapshot => {
      const userIds = [];
      snapshot.forEach(item => {
        userIds.push(item.val().userId);
      });

      setUserIdList(userIds.reverse());
    })
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
      <Header />
      <div>
        {chatIdList?.map(id => <Chat key={id} chatId={id} />)}
      </div>
    </Wrapper>
  );
}
