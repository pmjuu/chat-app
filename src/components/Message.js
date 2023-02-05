import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ref, remove, onValue } from "firebase/database";
import { db } from "../app/firebase";
import styled from "styled-components";
import format from "date-fns/format";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: top;

  margin: 10px 0;
  padding: 5px;
  border: 1px solid #ededed;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 1px 5px 1px rgba(255, 255, 255, 0.3);

  .top-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .user-info {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  img {
    margin-right: 5px;
  }

  .text-box {
    margin: 5px 0;
    padding: 3px 10px;
    border: 1px solid #ededed;
    border-radius: 5px;
    box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);
    white-space: pre-wrap;
  }

  .timestamp {
    text-align: right;
    color: gray;
    font-size: 0.9rem;
  }

  .delete {
    height: 1.2rem;
    margin-left: 5px;
    font-size: 0.9rem;
    color: #AF4141;
    background-color: white;
    border: 1px solid #ededed;
    border-radius: 5px;
    transition: 0.3s all ease;

    :hover {
      background-color: #AF4141;
      color: white;
      cursor: pointer;
    }
  }

  .none {
    display: none;
  }
`;

export default function Message({ messageId, chatId }) {
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [isMine, setIsMine] = useState(false);
  const loginInfo = useSelector(state => state.login);

  useEffect(() => {
    onValue(ref(db, `chats/${chatId}/messages/${messageId}`), snapshot => {
      const messageData = snapshot.val();
      setMessage(messageData);

      onValue(ref(db, `users/${messageData.userId}`), snapshot => {
        setUser(snapshot.val());
      });

      if (messageData.userId === loginInfo.userId) setIsMine(true);
    });
  }, []);

  function deleteMessage() {
    remove(ref(db, `chats/${chatId}/messages/${messageId}`));
  }

  return (
    <Wrapper>
      <div className="top-box">
        <div className="user-info">
          <img className="profile-image" src={user?.imageURL} alt="profile image"/>
          <span>{user?.name}</span>
        </div>
        <button className={isMine ? 'delete' : 'none'} onClick={deleteMessage}>X</button>
      </div>
      <div className="text-box">
        {message?.text}
      </div>
      <div className="timestamp">
        at {message && format(new Date(message?.createdAt.total), 'yyyy.MM.dd. HH:mm:ss')}
      </div>
    </Wrapper>
  );
}
