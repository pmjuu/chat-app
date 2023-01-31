import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import ChatList from "../components/ChatList";
import ChattingPage from "../components/ChattingPage";
import FriendList from "../components/FriendList";

export default function App() {

  const isChatting = useSelector(state => state.chatting.isChatting);

  return (
    <>
      {isChatting
        ? <ChattingPage />
        : (
          <Routes>
            <Route path="/" element={<Navigate to="/friends" />} />
            <Route path="/friends" element={<FriendList />} />
            <Route path="/chats" element={<ChatList />} />
          </Routes>
        )}
    </>
  );
}
