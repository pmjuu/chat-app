import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  background-color: white;
  border: 1px solid #ededed;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);
  padding: 3px;
`;

export default function ChattingPage({ onClose }) {
  return (
    <Wrapper>
      <div>
        <button onClick={onClose}>Close</button>
      </div>
      <div>
        <h1>Chat with ---</h1>
      </div>
      <div>
        <div>
          chat contents
        </div>
        <input placeholder="text message"/>
      </div>
    </Wrapper>
  );
}
