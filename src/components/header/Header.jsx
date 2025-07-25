import { Link } from "react-router-dom";
import Search from "../search/Search";
import Navbar from "../navbar/Navbar";
import CartIcon from "../cartIcon/CartIcon";
import styles from "./Header.module.css";

function Header({ getTotalItems }) {
  return (
    <header className={styles.siteHeader}>
      <div>
        <div className={styles.left}>
          <Navbar />
        </div>
        <div className={styles.middle}>
          <Link to="/">
            <div className={styles.title}>
              <h1>SCP</h1>
            </div>
          </Link>
        </div>
        <div className={styles.right}>
          <Search />
          <CartIcon cartCount={getTotalItems()} />
        </div>
      </div>
    </header>
  );
}

export default Header;
