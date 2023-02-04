import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100vw;
  max-width: 400px;
  height: 5vh;
  margin-bottom: 10px;
  background-color: white;
  border: 1px solid #ededed;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);

  a {
    width: 200px;
    text-decoration: none;
  }

  .button-default {
    margin: 5px;
    padding: 5px 10px;
    background-color: white;
    border: 1px solid #ededed;
    border-radius: 5px;
    transition: 0.3s all ease;

    text-align: center;
    color: rgb(90, 130, 200);
  }

  .button-default.button-header {
    height: 2.5vh;
    font-size: 1.3rem;
    font-weight: 700;
  }

  .button-default:hover {
    background-color: rgb(90, 130, 200);
    cursor: pointer;
    color: white;
  }
`;

export default function Header() {
  return (
    <Wrapper>
      <Link to="/friends" className="button-default button-header">Friends</Link>
      <Link to="/chats" className="button-default button-header">Chats</Link>
    </Wrapper>
  );
}
