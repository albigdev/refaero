import styles from "./Message.module.css";

function Message({ message }) {
  if (!message) return null;

  return <div className={styles.message}>{message}</div>;
}

export default Message;
