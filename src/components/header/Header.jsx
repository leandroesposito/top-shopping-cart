import Search from "../search/Search";
import Navbar from "../navbar/Navbar";
import CartIcon from "../cartIcon/CartIcon";
import styles from "./Header.module.css";

function Header({ getTotalItems }) {
  return (
    <header>
      <div className={styles.left}>
        <Navbar />
      </div>
      <div className={styles.middle}>
        <div className={styles.title}>
          <h1>SCP</h1>
        </div>
      </div>
      <div className={styles.right}>
        <Search />
        <CartIcon cartCount={getTotalItems()} />
      </div>
    </header>
  );
}

export default Header;
