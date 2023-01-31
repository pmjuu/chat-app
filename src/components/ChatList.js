import styled from "styled-components";
import { useSelector } from "react-redux";

import Header from "./Header";
import Chat from "./Chat";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function ChatList() {
  const chatIdList = useSelector(state => state.chat.allIds);

  return (
    <Wrapper>
      <Header />
      <div>
        {chatIdList.map(id => <Chat key={id} chatId={id} />)}
      </div>
    </Wrapper>
  );
}
