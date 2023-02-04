import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Friend from "./Friend";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  max-width: 400px;
  height: 85vh;

  .search-sort {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    margin-bottom: 10px;
  }

  .search-sort .button-default {
    margin: 5px;
    padding: 5px 10px;
    color: rgb(122, 173, 255);
    background-color: white;
    border: 1px;
    border-radius: 5px;
    transition: 0.3s all ease;
  }

  .search-sort .button-default:hover {
    color: white;
    background-color: rgb(122, 173, 255);
    cursor: pointer;
  }

  .friend-list {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
  }

  .friend-list .alert {
    color: white;
  }
`;

export default function FriendList() {
  const [userIdList, setUserIdList] = useState(null);
  const userState = useSelector(state => state.user);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const inputUserIds = [];
    for (let id of userState.allIds) {
      (userState[id].name.includes(searchKeyword)) && inputUserIds.push(id);
    }
    setUserIdList(inputUserIds);
  }, [searchKeyword]);

  const [isAscending, setIsAscending] = useState(true);

  function handleSortClick() {
    const sortedUserIds = [];
    const names = [...userState.allNames];

    isAscending === true
      ? names.sort((a, b) => a.localeCompare(b))
      : names.sort((a, b) => b.localeCompare(a));

    for (let name of names) {
      for (let id of userState.allIds) {
        if (userState[id].name === name) {
          sortedUserIds.push(id);
        }
      }
    }

    setUserIdList(sortedUserIds);
    setIsAscending(status => !status);
  }

  return (
    <Wrapper>
      <div className="search-sort">
        <input value={searchKeyword} onChange={e => setSearchKeyword(e.target.value)} placeholder="🔍 search name" required />
        <button onClick={handleSortClick} className="button-default">Sort</button>
      </div>
      <div className="friend-list">
        {userIdList?.length
          ? userIdList?.map((userId) => <Friend key={userId} id={userId} />)
          : <div className="alert">There is no matching name</div>}
      </div>
    </Wrapper>
  );
}
