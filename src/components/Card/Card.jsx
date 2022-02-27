import styles from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ onClick, title, rating, author, date, id, timeConverter, card }) => {
  const formattedDate = timeConverter(date);
  return (
    <Link to={`/${id}`} className={styles.card__link}>
      <article className={styles.card} onClick={onClick}>
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

export default Card;
