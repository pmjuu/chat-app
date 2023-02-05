import { equalTo, onValue, orderByChild, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../app/firebase";
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
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    if (!searchKeyword) return onValue(ref(db, `users`), snapshot => {
      setUserIdList(Object.keys(snapshot.val()));
    });

    const nameRef = query(ref(db, `users`), orderByChild('name'), equalTo(searchKeyword));
    onValue(nameRef, snapshot => {
      if (snapshot.exists()) return setUserIdList(Object.keys(snapshot.val()));
      if (searchKeyword) setUserIdList(null);
    });
  }, [searchKeyword]);

  function handleSortClick() {
    const orderedRef = query(ref(db, `users`), orderByChild('name'));
    onValue(orderedRef, snapshot => {
      const orderedIds = [];
      snapshot.forEach(item => {
        orderedIds.push(item.key);
      });
      setUserIdList(isAscending ? orderedIds.reverse() : orderedIds);
      setIsAscending(prev => !prev);
    });
  }

  return (
    <Wrapper>
      <div className="search-sort">
        <input value={searchKeyword} onChange={e => setSearchKeyword(e.target.value)} placeholder="🔍 search name" />
        <button onClick={handleSortClick} className="button-default">{isAscending ? 'Descending' : 'Ascending'}</button>
      </div>
      <div className="friend-list">
        {userIdList?.length
          ? userIdList?.map((userId) => <Friend key={userId} id={userId} />)
          : <div className="alert">There is no matching name</div>}
      </div>
    </Wrapper>
  );
}
