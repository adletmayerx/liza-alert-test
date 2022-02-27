import styles from "./Header.module.css";
import logo from "../../images/logo.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <img className={styles.header__logo} src={logo} alt="logo" />
      <h1 className={styles.header__title}>the freshest news for hackers</h1>
    </header>
  );
};

export default Header;