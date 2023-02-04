import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";

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
  const isLogined = useSelector(state => state.login.isLogined);
  const isChatting = useSelector(state => state.chatting.isChatting);

  useDefaultDB({ userId: "itsme", chatId: "room0" });
  useDefaultDB({ userId: "KbVTEKlAtAe1rHogTY9u", chatId: "room1" });
  useDefaultDB({ userId: "smPDjH1b2wpz9KXDgpXq", chatId: "room2" });
  useDefaultDB({ userId: "COvImeFBTixfSEYM1BLm", chatId: "room3" });
  useDefaultDB({ userId: "yoonseoID", chatId: "room4" });

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
