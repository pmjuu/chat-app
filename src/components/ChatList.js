import styled from "styled-components";
import Header from "./Header";
import Chat from "./Chat";

const Wrapper = styled.div`
  
`;

export default function ChatList({ onChattingStart }) {
  return (
    <Wrapper>
      <Header />
      <div>
        <Chat onChattingStart={onChattingStart} />
      </div>
    </Wrapper>
  );
}
