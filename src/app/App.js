import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ChatList from "../components/ChatList";
import ChattingPage from "../components/ChattingPage";
import FriendList from "../components/FriendList";


export default function App() {
  const [isChatting, setIsChatting] = useState(false);

  return (
    <>
      {isChatting
        ? <ChattingPage onClose={() => setIsChatting(false)} />
        : (
          <Routes>
            <Route path="/" element={<Navigate to="/friends" />} />
            <Route path="/friends" element={<FriendList onChattingStart={() => setIsChatting(true)} />} />
            <Route path="/chats" element={<ChatList onChattingStart={() => setIsChatting(true)} />} />
          </Routes>
        )}
    </>
  );
}
