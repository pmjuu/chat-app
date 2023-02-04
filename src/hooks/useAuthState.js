import { useSelector } from "react-redux";

export default function useAuthState(auth) {
  const apiKey = useSelector(state => state.login.apiKey);
}
