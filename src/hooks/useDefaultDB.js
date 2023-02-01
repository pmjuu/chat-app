import { useEffect } from "react";
import PropTypes from 'prop-types';
import { ref, set } from "firebase/database";
import db from "../app/firebase";
import { Timestamp } from "firebase/firestore";

export default function useDefaultDB({ userId, chatId }) {
  useEffect(() => {
    const newTimestamp = Timestamp.fromDate(new Date())
    const newTotal = (newTimestamp.seconds)*1000 + (newTimestamp.nanoseconds)/1000000;
    const defaultMsgId = `--defaultIdOf${chatId}`;
    const defaultMessage = {
      createdAt: {...newTimestamp, total: newTotal},
      text: `start chatting with me`,
      userId: userId,
    };

    set(ref(db, `chats/${chatId}/messages/${defaultMsgId}`), defaultMessage);
    set(ref(db, `chats/${chatId}/userId`), userId);
    set(ref(db, `chats/${chatId}/lastMessage`), defaultMessage);
  }, []);
}

useDefaultDB.propTypes = {
  userId: PropTypes.string,
  chatId: PropTypes.string,
}
