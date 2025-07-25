import { Link } from "react-router-dom";
import icon from "../../assets/icons/cart-shopping.svg";
import styles from "./CartIcon.module.css";

function CartIcon({ cartCount }) {
  return (
    <Link to="/cart">
      <div className={styles.cartCount}>
        <div className="iconContainer">
          <div className={styles.icon}>
            <img src={icon} alt="cart" />
          </div>
        </div>
        {cartCount > 1 && (
          <div className={styles.number}>{cartCount ?? null}</div>
        )}
      </div>
    </Link>
  );
}

export default CartIcon;
