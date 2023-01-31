import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useFirestoreData from "../hooks/useFirestoreData";

import ChatList from "../components/ChatList";
import ChattingPage from "../components/ChattingPage";
import FriendList from "../components/FriendList";

export default function App() {
  const [isChatting, setIsChatting] = useState(false);
  const [chatId, setChatId] = useState(null);

  function handleChattingStart(id) {
    setIsChatting(true);
    setChatId(id);
  }

  useFirestoreData();

  return (
    <>
      {isChatting
        ? <ChattingPage chatId={chatId} onClose={() => setIsChatting(false)} />
        : (
          <Routes>
            <Route path="/" element={<Navigate to="/friends" />} />
            <Route path="/friends" element={<FriendList onChattingStart={handleChattingStart} />} />
            <Route path="/chats" element={<ChatList onChattingStart={handleChattingStart} />} />
          </Routes>
        )}
    </>
  );
}
