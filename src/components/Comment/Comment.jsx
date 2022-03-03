import styles from "./Comment.module.css";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Comment = ({
  dead,
  text,
  author,
  time,
  subComments,
  timeConverter,
  makeList,
}) => {
  const ref = useRef(null);
  const date = timeConverter(time);

  useEffect(() => {
    if (dead) {
      ref.current.textContent = "comment deleted";
    } else {
      function htmlDecode(input) {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
      }
      ref.current.textContent = htmlDecode(text);
    }
  }, [dead, ref, text]);

  return (
    <div className={styles.card}>
      <p ref={ref} className={styles.card__text}></p>
      <div className={styles.card__info}>
        <p className={styles.card__author}>{author}</p>
        <p className={styles.card__date}>{date}</p>
      </div>
      {subComments && (
        <div className={styles.card__kids}>
          {subComments !== null && makeList(subComments)}
        </div>
      )}
    </div>
  );
};

Comment.propTypes = {
  dead: PropTypes.bool,
  text: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  subComments: PropTypes.arrayOf(PropTypes.object),
  timeConverter: PropTypes.func.isRequired,
  makeList: PropTypes.func.isRequired,
};
export default Comment;
