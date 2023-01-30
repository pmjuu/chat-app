import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  background-color: white;
  border: 1px solid #ededed;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);
  padding: 3px;

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

export default function Friend({ onChattingStart }) {
  return (
    <Wrapper>
      <img src="" alt="profile image"/>
      <span>name</span>
      <button className="button-default" onClick={onChattingStart}>Chat</button>
    </Wrapper>
  );
}
