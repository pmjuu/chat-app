import styled from "styled-components";
import { useDispatch } from "react-redux";
import { startChatting } from "../features/chattingSlice";
import { useEffect, useState } from "react";
import { onValue, ref, remove } from "firebase/database";
import { db } from "../app/firebase";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin: 5px 0;
  background-color: rgb(70, 70, 70);
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
    text-align: left;
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

  .delete {
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
`;

export default function Friend({ id }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    onValue(ref(db, `users/${id}`), snapshot => {
      setUser(snapshot.val());
      setUserId(snapshot.key);
    });
  }, []);

  function handleChatClick() {
    dispatch(startChatting({ currentUserId: userId, currentChatId: user.chatId }));
  }

  function deleteFriend() {
    remove(ref(db, `users/${id}`));
  }

  return (
    <Wrapper>
      <div className="left-section">
        <img className="profile-image" src={user?.imageURL} alt={`${user?.name}'s profile`} />
        <span className="user-name">{user?.name}</span>
      </div>
      <div>
        <button className="button-default" onClick={handleChatClick}>Chat</button>
        {/* <button className="delete" onClick={deleteFriend}>X</button> */}
      </div>
    </Wrapper>
  );
}
