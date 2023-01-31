import styled from "styled-components";
import { useSelector } from "react-redux";
import useFirestoreData from "../hooks/useFirestoreData";

import Header from "./Header";
import Chat from "./Chat";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function ChatList({ onChattingStart }) {
  useFirestoreData();
  const chatIdList = useSelector(state => state.chat.allIds);

  return (
    <Wrapper>
      <Header />
      <div>
        {chatIdList.map(id => <Chat key={id} chatId={id} onChattingStart={onChattingStart} />)}
      </div>
    </Wrapper>
  );
}
