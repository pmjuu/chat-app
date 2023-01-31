import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getUserData } from "../features/userSlice";

export default function useFirestoreData() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, []);
};
