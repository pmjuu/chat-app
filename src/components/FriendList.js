import styled from "styled-components";
import Friend from "./Friend";
import Header from "./Header";

const Wrapper = styled.div`
  .search-sort {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    margin-bottom: 10px;
  }
`;

export default function FriendList({ onChattingStart }) {
  return (
    <Wrapper>
      <Header />
      <div className="search-sort">
        <form>
          <input placeholder="search name"></input>
          <input type="submit" value="🔍"/>
        </form>
        <button>Sort by name</button>
      </div>
      <div>
        <Friend onChattingStart={onChattingStart} />
      </div>
    </Wrapper>
  );
}
