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

  .sort-button {
    margin-left: 10px;
  }
`;

export default function FriendList() {
  const [userIdList, setUserIdList] = useState(null);
  const userState = useSelector(state => state.user);

  useEffect(() => {
    setUserIdList(userState.allIds);
  }, []);

  const [searchKeyword, setSearchKeyword] = useState("");

  function handleNameChange(e) {
    setSearchKeyword(e.target.value);
  }

  function handleNameSubmit(e) {
    e.preventDefault();

    for (let id of userState.allIds) {
      if (userState[id].name === searchKeyword) {
        setSearchKeyword("");
        return setUserIdList([id]);
      }
    }

    return alert('there is no matching name');
  }

  const [isAscending, setIsAscending] = useState(true);

  function handleSortClick() {
    const newUserIds = [];
    const names = [...userState.allNames];

    isAscending === true
      ? names.sort()
      : names.reverse();

    for (let name of names) {
      for (let id of userState.allIds) {
        if (userState[id].name === name) {
          newUserIds.push(id);
        }
      }
    }

    setUserIdList(newUserIds);
    setIsAscending(status => !status);
  }

  return (
    <Wrapper>
      <Header />
      <div className="search-sort">
        <form onSubmit={handleNameSubmit}>
          <input value={searchKeyword} onChange={handleNameChange} placeholder="search name" required />
          <input type="submit" value="🔍" />
        </form>
        <button onClick={handleSortClick} className="sort-button">Sort</button>
      </div>
      <div className="friend-list">
        {userIdList?.map((userId) => <Friend key={userId} id={userId} />)}
      </div>
    </Wrapper>
  );
}
