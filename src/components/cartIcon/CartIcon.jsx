import icon from "../../assets/icons/cart-shopping.svg";
import styles from "./CartIcon.module.css";

function CartIcon({ cartCount }) {
  return (
    <div className={styles.cartCount}>
      <div className="iconContainer">
        <div className={styles.icon}>
          <img src={icon} alt="cart" />
        </div>
      </div>
      <div className={styles.number}>{cartCount ?? null}</div>
    </div>
  );
}

export default CartIcon;
