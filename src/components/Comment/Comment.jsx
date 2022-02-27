import styles from "./Comment.module.css";
import { useEffect, useRef } from "react";

const Comment = ({ text, author, time, kids, children, timeConverter, CommentElement }) => {
  const ref = useRef(null);
  const date = timeConverter(time);

  useEffect(() => {
    function htmlDecode(input) {
      var doc = new DOMParser().parseFromString(input, "text/html");
      return doc.documentElement.textContent;
    }
    ref.current.textContent = htmlDecode(text);
  }, [ref, text]);

  return (
    <div className={styles.card}>
      <p ref={ref} className={styles.card__text}></p>
      <div className={styles.card__info}>
        <p className={styles.card__author}>{author}</p>
        <p className={styles.card__date}>{date}</p>
      </div>
      {kids && <div className={styles.card__kids}>{children}</div>}
    </div>
  );
};
export default Comment;
