import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";
import { ref, set } from "firebase/database";
import { db } from "../app/firebase";

import useDefaultDB from "../hooks/useDefaultDB";
import Login from "../components/Login";
import ChattingPage from "../components/ChattingPage";
import FriendList from "../components/FriendList";
import ChatList from "../components/ChatList";
import Header from "../components/Header";
import Setting from "../components/Setting";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function App() {
  const loginUser = useSelector(state => state.login);
  const isLogined = useSelector(state => state.login.isLogined);
  const isChatting = useSelector(state => state.chatting.isChatting);

  useDefaultDB({ userId: "_defaultID_rose", chatId: "_defaultRoom_rose" });
  useDefaultDB({ userId: "_defaultID_yerin", chatId: "_defaultRoom_yerin" });
  useDefaultDB({ userId: "_defaultID_jisoo", chatId: "_defaultRoom_jisoo" });
  useDefaultDB({ userId: "_defaultID_yoonseo", chatId: "_defaultRoom_yoonseo" });

  if (isLogined) {
    const newChatId = `roomOf_${loginUser.name}_${loginUser.userId}`;
    const user = {
      imageURL: loginUser.imageURL,
      name: loginUser.name,
      chatId: newChatId,
    };
    set(ref(db, `chats/${newChatId}/userId`), loginUser.userId);
    set(ref(db, `users/${loginUser.userId}`), user);
  }

  return (
    <Wrapper>
      {isLogined
        ? <>
            {isChatting
              ? <ChattingPage />
              : <>
                  <Header />
                  <Routes>
                    <Route path="/login" element={<Navigate to="/friends"/>} />
                    <Route path="/friends" element={<FriendList />} />
                    <Route path="/chats" element={<ChatList />} />
                  </Routes>
                  <Setting />
                </>}
          </>
        : <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
          </Routes>}
    </Wrapper>
  );
}
