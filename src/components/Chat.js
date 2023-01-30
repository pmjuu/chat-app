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
  transition: 0.3s all ease;
  padding: 3px;

  :hover {
    cursor: pointer;
    color: white;
    background-color: rgb(89, 127, 188);
  }

  .chat-info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 5px;
  }

  .chat-info span {
    margin: 3px;
  }
`;

export default function Chat({ onChattingStart }) {
  return (
    <Wrapper onClick={onChattingStart}>
      <div>
        <img src="" alt="profile image" />
      </div>
      <div className="chat-info">
        <span>백예린</span>
        <p>chat contents</p>
      </div>
      <div>
        date
      </div>
    </Wrapper>
  );
}
