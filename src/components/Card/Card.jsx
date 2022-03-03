import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Card = ({ title, rating, author, date, id, timeConverter }) => {
  const formattedDate = timeConverter(date);
  return (
    <Link to={`/liza-alert-test/${id}`} className={styles.card__link}>
      <article className={styles.card}>
        <div className={styles.card__header}>
          <h3 className={styles.card__title}>{title}</h3>
          <p className={styles.card__rating}>rating: {rating}</p>
        </div>
        <div className={styles.card__body}>
          <p className={styles.card__author}>by {author}</p>
          <p className={styles.card__date}>published: {formattedDate}</p>
        </div>
      </article>
    </Link>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  timeConverter: PropTypes.func.isRequired,
};

export default Card;
