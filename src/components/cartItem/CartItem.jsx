import { Link, useOutletContext } from "react-router-dom";
import QuantitySelector from "../quantity/QuantitySelector";
import styles from "./CartItem.module.css";

function CartItem({ itemData, quantity }) {
  const { setItemCount, removeFromCart } = useOutletContext();

  function onAddClick() {
    setItemCount(itemData.id, quantity + 1);
  }

  function onSubClick() {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setItemCount(itemData.id, newQuantity);
  }

  return (
    <div className={styles.cartItem}>
      <div className={styles.deleteButtonContainer}>
        <button
          className={styles.delete}
          aria-label="Remove from cart"
          onClick={() => {
            removeFromCart(itemData.id);
          }}
        >
          Remove
        </button>
      </div>
      <div className={styles.itemImage}>
        <div className={styles.imageContainer}>
          <div className={styles.image}>
            <img src={itemData.image} alt={itemData.title} />
          </div>
        </div>
      </div>
      <div className={styles.itemInfo}>
        <div className={styles.title}>
          <Link to={`/product/${itemData.id}`}>
            <h3>{itemData.title}</h3>
          </Link>
        </div>
        <div className={styles.description}>
          <div>{itemData.description}</div>
        </div>
      </div>
      <div className={styles.quantityColumn}>
        <QuantitySelector
          onAddClick={onAddClick}
          onSubClick={onSubClick}
          quantity={quantity}
        />
      </div>
      <div className={styles.totalColumn}>
        <div>${Math.trunc(itemData.price * quantity * 10) / 10}</div>
      </div>
    </div>
  );
}

export default CartItem;
