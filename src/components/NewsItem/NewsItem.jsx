import styles from "./NewsItem.module.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import { Comment } from "..";

const NewsItem = ({ newsList, timeConverter }) => {
  let { id } = useParams();
  const newsItem = newsList.find((item) => item.id === +id);
  const formattedDate = timeConverter(newsItem.time);

  const [commentsSectionIsOpen, setCommentsSectionIsOpen] = useState(false);
  const [commentsList, setCommentsList] = useState([]);

  const handleCommentsButtonClick = () => {
    setCommentsSectionIsOpen(!commentsSectionIsOpen);
  };

  useEffect(() => {
    if (newsItem.kids) {
      newsItem.kids.forEach((id) => {
        api.getItemById(id).then((res) => {
          setCommentsList((c) => [...c, res]);
        });
      });
    }
  }, [newsItem.kids]);

  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <Link className={styles.card__link} to="/">
          &#8592;return to home page{" "}
        </Link>
        <h2 className={styles.card__title}>{newsItem.title}</h2>
      </div>
      <div className={styles.card__body}>
        <p>
          link:{" "}
          <a
            className={styles.card__link}
            href={newsItem.url}
            target="_blank"
            rel="noreferrer"
          >
            {newsItem.url}
          </a>
        </p>
        <p className={styles.card__author}>by {newsItem.by}</p>
        <p className={styles.card__date}>published: {formattedDate}</p>
      </div>
      <div className={styles.card__footer}>
        <p className={styles["card__comments-count"]}>
          comments: {newsItem.descendants}
        </p>
        <button
          className={styles["card__comments-button"]}
          onClick={handleCommentsButtonClick}
        >
          {commentsSectionIsOpen
            ? "close comments section"
            : "open comments section"}
        </button>{" "}
        {newsItem.descendants > 0 && commentsSectionIsOpen && (
          <ul className={styles["card__comments-list"]}>
            {commentsList.map((c) => (
              <li key={c.id}>
                <Comment
                  text={c.text}
                  author={c.by}
                  time={c.time}
                  kids={null || c.kids}
                  timeConverter={timeConverter}
                >
                </Comment>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NewsItem;
