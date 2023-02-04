import { ref, remove } from "firebase/database";
import { auth, db } from "../app/firebase";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { setUserData } from "../features/loginSlice";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100vw;
  max-width: 400px;
  height: 5vh;
  margin-top: 10px;
  background-color: gray;
  border: 1px solid #ededed;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);

  .button-default {
    margin: 5px;
    padding: 5px 10px;
    background-color: white;
    border: 1px;
    border-radius: 5px;
    transition: 0.3s all ease;

    color: #AF4141;
  }

  .button-default:hover {
    color: white;
    background-color: #AF4141;
    cursor: pointer;
  }

  a {
    font-size: 0.9rem;
    text-decoration: none;
  }
`;

export default function Setting() {
  const dispatch = useDispatch();
  const login = useSelector(state => state.login);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (login.apiKey === process.env.REACT_APP_API_KEY) setIsAdmin(true);
  }, []);

  function deleteAll(data) {
    remove(ref(db, `${data}`));
  }

  function handleGoogleLogout() {
    signOut(auth).then(dispatch(setUserData(null)));
  }

  return(
    <Wrapper>
      {isAdmin
        ? <div>
            <button className="button-default" onClick={() => deleteAll("chats")}>Delete All chats</button>
            <button className="button-default" onClick={() => deleteAll("users")}>Delete All users</button>
          </div>
        : null}
      <Link to="/" onClick={handleGoogleLogout} className="button-default">Log Out</Link>
    </Wrapper>
  );
}
