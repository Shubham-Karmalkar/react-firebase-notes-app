import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import brand_logo from "../resource/logo.png";

export const NavBar = () => {
  return (
    <div className={styles.topnav}>
      <Link to="/">
        <img src={brand_logo} className={styles.brand_logo} />
      </Link>
      <div className={styles.signLog}>
        <Link to="/login" className={styles.signBtn}>Log in</Link>
        <Link to="/signUp" className={styles.signBtn}>Sign up</Link>
      </div>
    </div>
  );
};
