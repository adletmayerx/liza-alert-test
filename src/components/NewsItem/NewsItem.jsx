import styles from "./NewsItem.module.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import { MemoCommentsSection } from "..";
import PropTypes from "prop-types";

const NewsItem = ({ newsList, timeConverter }) => {
  let { id } = useParams();
  const newsItem = newsList.find((item) => item.id === +id);
  const formattedDate = timeConverter(newsItem.time);

  const [commentsSectionIsOpen, setCommentsSectionIsOpen] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [commentsHierarchy, setCommentsHierarchy] = useState([]);

  const handleCommentsButtonClick = () => {
    setCommentsSectionIsOpen(!commentsSectionIsOpen);
  };

  useEffect(() => {
    const checkKids = (parent) => {
      if (parent.kids) {
        parent.kids.forEach((item) => {
          api
            .getItemById(item)
            .then((res) => {
              setCommentsList((c) => [...c, res]);
              checkKids(res);
            })
            .catch((e) => {
              console.log(e);
            });
        });
      }
    };

    if (newsItem.kids) {
      newsItem.kids.forEach((id) => {
        api
          .getItemById(id)
          .then((res) => {
            setCommentsList((c) => [...c, res]);
            checkKids(res);
          })
          .catch((e) => {
            console.log(e);
          });
      });
    }
  }, [newsItem.kids]);

  useEffect(() => {
    const buildHierarchy = (array) => {
      let roots = [];
      let subComments = {};

      for (let i = 0; i < array.length; ++i) {
        let item = array[i];
        let p = item.parent;
        let target =
          p === newsItem.id ? roots : subComments[p] || (subComments[p] = []);

        target.push(item);
      }

      const findChildren = (parent) => {
        if (subComments[parent.id]) {
          parent.subComments = subComments[parent.id];
          for (var i = 0; i < parent.subComments.length; ++i) {
            findChildren(parent.subComments[i]);
          }
        }
      };

      for (let i = 0; i < roots.length; ++i) {
        findChildren(roots[i]);
      }

      return roots;
    };

    setCommentsHierarchy(buildHierarchy(commentsList));
  }, [commentsList, newsItem.id]);

  useEffect(() => {
    console.log(commentsHierarchy);
  }, [commentsHierarchy]);
  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <Link className={styles.card__link} to="/liza-alert-test">
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
          <MemoCommentsSection
            timeConverter={timeConverter}
            commentsHierarchy={commentsHierarchy}
          />
        )}
      </div>
    </div>
  );
};

NewsItem.propTypes = {
  timeConverter: PropTypes.func.isRequired,
  newsList: PropTypes.arrayOf(PropTypes.object),
};

export default NewsItem;
