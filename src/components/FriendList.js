import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Friend from "./Friend";
import Header from "./Header";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .search-sort {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    margin-bottom: 10px;
  }
`;

export default function FriendList() {
  const [userData, setUserData] = useState(null);

  const userState = useSelector(state => state.user);
  // console.log('test...', userData)

  useEffect(() => {
    const isFull = (obj) => Object.keys(obj).length !== 0;
    isFull(userState) && setUserData(userState);
  });

  function handleSortClick() {

  }

  return (
    <Wrapper>
      <Header />
      <div className="search-sort">
        <form>
          <input placeholder="search name"></input>
          <input type="submit" value="🔍"/>
        </form>
        <button onClick={handleSortClick}>Sort</button>
      </div>
      <div className="friend-list">
        {userData?.allIds.map((userId) => <Friend key={userId} id={userId} />)}
      </div>
    </Wrapper>
  );
}
