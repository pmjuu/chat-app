import { useEffect } from "react";
import PropTypes from 'prop-types';
import { ref, set } from "firebase/database";
import db from "../app/firebase";
import { format } from "date-fns";

export default function useDefaultDB({ userId, chatId }) {
  useEffect(() => {
    const newDay = new Date('2023-01-01 00:00:00');
    const defaultMsgId = `--defaultIdOf${chatId}`;
    const defaultMessage = {
      createdAt: format(newDay, "yyyy-MM-dd HH:mm:ss"),
      text: `start chatting with me`,
      userId: userId,
    };

    set(ref(db, `messages/${defaultMsgId}`), defaultMessage);
    set(ref(db, `chats/${chatId}/messages/${defaultMsgId}`), defaultMessage);
    set(ref(db, `chats/${chatId}/userId`), userId);
  }, []);
}

useDefaultDB.propTypes = {
  userId: PropTypes.string,
  chatId: PropTypes.string,
}
