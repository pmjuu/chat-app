import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { startChatting } from "../features/chattingSlice";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../app/firebase";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 97%;
  margin: 5px 0;
  background-color: ${props => props.color};
  color: white;
  border: 1px solid #ededed;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 1px rgba(255, 255, 255, 0.2);

  .left-section {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  img {
    margin: 5px 10px
  }

  .user-name {
    width: 80px;
    margin: 0 5px;
    text-align: left;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .button-default {
    margin: 0 10px;
    padding: 5px 10px;
    color: rgb(122, 173, 255);
    background-color: white;
    border: 1px;
    border-radius: 5px;
    transition: 0.3s all ease;
  }

  .button-default:hover {
    color: white;
    background-color: rgb(122, 173, 255);
    cursor: pointer;
  }
`;

export default function Friend({ id }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
  const login = useSelector(state => state.login);

  useEffect(() => {
    onValue(ref(db, `users/${id}`), snapshot => {
      setUser(snapshot.val());
      setUserId(snapshot.key);
    });
  }, []);

  function handleChatClick() {
    dispatch(startChatting({ currentUserId: userId, currentChatId: user.chatId }));
  }

  return (
    <Wrapper color={id === login.userId ? 'gray' : 'rgb(70, 70, 70)'}>
      <div className="left-section">
        <img className="profile-image" src={user?.imageURL} alt={`${user?.name}'s profile`} />
        <span className="user-name">{user?.name}</span>
        {id === login.userId && <span>(current user)</span>}
      </div>
      <div>
        <button className="button-default" onClick={handleChatClick}>Chat</button>
      </div>
    </Wrapper>
  );
}
