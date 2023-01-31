import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-color: white;
  border: 1px solid #ededed;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);
  width: 300px;
  height: 50px;
  margin-bottom: 10px;

  a {
    text-decoration: none;
  }

  .button-default {
    margin: 5px;
    padding: 5px 10px;
    font-size: 1em;
    color: rgb(122, 173, 255);
    background-color: white;
    border: 1px solid #ededed;
    border-radius: 5px;
    transition: 0.3s all ease;
  }

  .button-default:hover {
    color: white;
    background-color: rgb(122, 173, 255);
    cursor: pointer;
  }

  .button-default:active {
    background-color: rgb(89, 127, 188);
  }
`;

export default function Header() {
  return (
    <Wrapper>
      <Link to="/friends"><span className="button-default">Friends</span></Link>
      <Link to="/chats"><span className="button-default">Chats</span></Link>
    </Wrapper>
  );
}
