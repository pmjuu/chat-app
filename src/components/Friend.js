import styled from "styled-components";
import { useSelector } from "react-redux";

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

  .button-default:active {
    background-color: rgb(89, 127, 188);
  }
`;

export default function Friend({ userId, onChattingStart }) {
  const userInfo = useSelector(state => state.user[userId]);
  const { id, imageURL, name, chatId } = userInfo;

  return (
    <Wrapper>
      <img src={imageURL} alt={`${name}'s image`} />
      <span>{name}</span>
      <button className="button-default" onClick={() => {onChattingStart(chatId)}}>Chat</button>
    </Wrapper>
  );
}
