import { useEffect } from "react";
import PropTypes from 'prop-types';
import { ref, set } from "firebase/database";
import { db } from "../app/firebase";
import { Timestamp } from "firebase/firestore";
import { useSelector } from "react-redux";

export default function useDefaultDB({ userId, chatId }) {
  const user = useSelector(state => state.default);

  useEffect(() => {
    const newTimestamp = Timestamp.fromDate(new Date())
    const newTotal = (newTimestamp.seconds)*1000 + (newTimestamp.nanoseconds)/1000000;
    const defaultMsgId = `--defaultIdOf${chatId}`;
    const defaultMessage = {
      createdAt: {...newTimestamp, total: newTotal},
      text: `start chatting with me`,
      userId: userId,
    };
    const defaultUser = {
      imageURL: user[userId].imageURL,
      name: user[userId].name,
      chatId: chatId,
    };

    set(ref(db, `chats/${chatId}/messages/${defaultMsgId}`), defaultMessage);
    set(ref(db, `chats/${chatId}/userId`), userId);
    set(ref(db, `chats/${chatId}/lastMessage`), defaultMessage);
    set(ref(db, `users/${userId}`), defaultUser);
  }, []);
}

useDefaultDB.propTypes = {
  userId: PropTypes.string,
  chatId: PropTypes.string,
}
