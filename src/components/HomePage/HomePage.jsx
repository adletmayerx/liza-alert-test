import styles from "./HomePage.module.css";
import { Card } from "..";

const HomePage = ({ cardsList, timeConverter }) => {
  return (
    <div className={styles["home-page"]}>
      <ul className={styles["cards-list"]}>
        {cardsList.map((card) => {
          return (
            <li key={card.id}>
              <Card
                title={card.title}
                rating={card.score}
                author={card.by}
                date={card.time}
                id={card.id}
                timeConverter={timeConverter}
                card={card}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HomePage;
