import styles from "./CommentsSection.module.css";
import { Comment } from "..";
import React from "react";
import PropTypes from "prop-types";

const CommentsSection = ({ timeConverter, commentsHierarchy }) => {
  const makeList = (arr) => {
    return (
      <ul className={styles["comments-list"]}>
        {arr
          .sort((a, b) => a.time - b.time)
          .map((c) => {
            return (
              <li key={c.id}>
                <Comment
                  dead={c.dead}
                  text={c.text}
                  author={c.by}
                  time={c.time}
                  kids={c.kids}
                  timeConverter={timeConverter}
                  makeList={makeList}
                  subComments={c.subComments}
                ></Comment>
              </li>
            );
          })}
      </ul>
    );
  };

  return <>{makeList(commentsHierarchy)}</>;
};
CommentsSection.propTypes = {
  timeConverter: PropTypes.func.isRequired,
  commentsHierarchy: PropTypes.arrayOf(PropTypes.object),
};

const MemoCommentsSection = React.memo(CommentsSection);

export default MemoCommentsSection;
