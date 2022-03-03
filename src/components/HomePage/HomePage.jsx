import styles from "./HomePage.module.css";
import { Card } from "..";
import PropTypes from "prop-types";

const HomePage = ({ cardsList, timeConverter }) => {
  return (
    <div className={styles["home-page"]}>
      <ul className={styles["cards-list"]}>
        {cardsList
          .sort((a, b) => b.time - a.time)
          .map((card) => {
            return (
              <li key={card.id}>
                <Card
                  title={card.title}
                  rating={card.score}
                  author={card.by}
                  date={card.time}
                  id={card.id}
                  timeConverter={timeConverter}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

HomePage.propTypes = {
  timeConverter: PropTypes.func.isRequired,
  cardsList: PropTypes.arrayOf(PropTypes.object),
};

export default HomePage;
