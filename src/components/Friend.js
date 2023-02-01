import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { startChatting } from "../features/chattingSlice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  background-color: rgb(70, 70, 70);
  color: white;
  border: 1px solid #ededed;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 1px rgba(255, 255, 255, 0.2);
  margin: 10px 0;
  padding: 5px;
  width: 280px;

  img {
    height: 50px;
    width: 50px;
    border: 1px solid #ededed;
    border-radius: 50%;
  }

  .button-default {
    margin: 5px;
    padding: 5px 10px;
    color: rgb(122, 173, 255);
    background-color: white;
    border: 1px solid #ededed;
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
  const userInfo = useSelector(state => state.user[id]);
  const { userId, imageURL, name, chatId } = userInfo;

  function handleChatClick() {
    dispatch(startChatting({ currentUserId: userId, currentChatId: chatId }));
  }

  return (
    <Wrapper>
      <img src={imageURL} alt={`${name}'s image`} />
      <span>{name}</span>
      <button className="button-default" onClick={handleChatClick}>Chat</button>
    </Wrapper>
  );
}
