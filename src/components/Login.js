import { GoogleAuthProvider, signInWithPopup, setPersistence, browserSessionPersistence, onAuthStateChanged } from "firebase/auth";
import { auth } from "../app/firebase";
import { useDispatch } from "react-redux";
import { setUserData } from "../features/loginSlice";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 90vh;
  color: white;

  .title {
    margin: 5px;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .button-default {
    margin: 5px;
    padding: 5px 10px;
    font-size: 1rem;
    color: rgb(122, 173, 255);
    background-color: white;
    border: 1px solid #ededed;
    border-radius: 5px;
    transition: 0.3s all ease;

    :hover {
      background-color: rgb(122, 173, 255);
      color: white;
      cursor: pointer;
    }
  }
`;

export default function Login() {
  const dispatch = useDispatch();

  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      onAuthStateChanged(auth, user => {
        if (user) {
          dispatch(setUserData(JSON.parse(JSON.stringify(user))));
        }
      })
    });

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(data => {
        dispatch(setUserData(JSON.parse(JSON.stringify(data.user))));
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <Wrapper>
      <div className="title">Realtime Chatting</div>
      <div>Chat with people in real time</div>
      <button className="button-default" onClick={handleGoogleLogin}>Log in with Google</button>
    </Wrapper>
  );
}
