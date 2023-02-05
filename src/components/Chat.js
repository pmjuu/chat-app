import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ref, onValue, query, orderByChild, set } from "firebase/database";
import { db } from "../app/firebase";
import styled from "styled-components";
import { startChatting } from "../features/chattingSlice";
import format from "date-fns/format";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin: 5px 0;
  background-color: white;
  border: 1px solid #ededed;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);
  transition: 0.3s all ease;

  :hover {
    background-color: rgb(89, 127, 188);
    cursor: pointer;
    color: white;
  }

  .left-section {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  img {
    margin: 5px 10px
  }

  .chat-info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 5px;
    text-align: left;
  }
  .chat-info .user-name {
    font-size: 1.1em;
    font-weight: 600;
  }

  .chat-info .last-message {
    width: 150px;
    height: 2.4em;

    margin-top: 3px;
    line-height: 1.2em;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-wrap:break-word;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: normal;
  }

  .timestamp {
    margin: 0 10px;
    font-size: 0.8em;
    text-align: right;
  }
`;

export default function Chat({ chatId }) {
  useEffect(() => {
    onValue(query(ref(db, `chats/${chatId}/messages`), orderByChild('createdAt/total')), snapshot => {
      let lastMessage = null;
      snapshot.forEach(item => {
        lastMessage = item.val();
      });
      set(ref(db, `chats/${chatId}/lastMessage`), lastMessage);
    });
  }, []);

  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    onValue(ref(db, `chats/${chatId}`), snapshot => setChatInfo(snapshot.val()));
  }, []);

  const [user, setUser] = useState();
  useEffect(() => {
    onValue(ref(db, `users/${chatInfo?.userId}`), snapshot => {
      setUser(snapshot.val());
    });
  }, [chatInfo]);

  useEffect(() => {
    chatInfo && onValue(ref(db, `chats/${chatId}/lastMessage`), snapshot => setLastMessage(snapshot.val()));
  }, [chatInfo])

  function handleChatClick() {
    dispatch(startChatting({ currentUserId: chatInfo.userId, currentChatId: chatId }));
  }

  return (
    <Wrapper onClick={handleChatClick}>
      {chatInfo && (
        <>
          <div className="left-section">
            <div>
              <img className="profile-image" src={user?.imageURL} alt="profile" />
            </div>
            <div className="chat-info">
              <div className="user-name">{user?.name}</div>
              <div className="last-message">{lastMessage?.text}</div>
            </div>
          </div>
          <div className="timestamp">
            {lastMessage && format(new Date(lastMessage?.createdAt?.total), "yyyy.MM.dd.")}<br/>
            {lastMessage && format(new Date(lastMessage?.createdAt?.total), "HH:mm:ss")}
          </div>
        </>
      )}
    </Wrapper>
  );
}
