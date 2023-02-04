import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../app/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../features/loginSlice";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;
  color: white;

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
  const isLogined = useSelector(state => state.login.isLogined);

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
      <h3>구글 로그인</h3>
      {!isLogined && <div>Please Log in</div>}
      <button className="button-default" onClick={handleGoogleLogin}>Log in</button>
    </Wrapper>
  );
}
