import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ref, get } from "firebase/database";
import db from "../app/firebase";
import styled from "styled-components";
import format from "date-fns/format";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: top;

  border: 1px solid #ededed;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
  padding: 5px;
  width: 280px;

  .user-info {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  img {
    margin-right: 5px;
    height: 50px;
    width: 50px;
    border: 1px solid #ededed;
    border-radius: 50%;
  }

  .message-box {
    margin: 5px 0;
    padding: 3px 10px;
    border: 1px solid #ededed;
    border-radius: 5px;
  }

  .timestamp {
    text-align: right;
    color: gray;
  }
`;

export default function Message({ messageId, chatId }) {

  const [message, setMessage] = useState(null);
  const user = useSelector(state => state.user[message?.userId]);

  useEffect(() => {
    get(ref(db, `chats/${chatId}/messages/${messageId}`))
      .then(snapshot => setMessage(snapshot.val()));
  }, []);

  return (
    <Wrapper>
      <div className="user-info">
        <img src={user?.imageURL} alt="profile image"/>
        <span>{user?.name}</span>
      </div>
      <div className="message-box">
        {message?.text}
      </div>
      <div className="timestamp">
        at {message && format(new Date(message?.createdAt?.total), 'yyyy-MM-dd HH:mm:ss')}
      </div>
    </Wrapper>
  );
}
