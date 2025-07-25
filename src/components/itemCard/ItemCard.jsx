import { Link } from "react-router-dom";
import styles from "./ItemCard.module.css";

function ItemCard({ itemData, addToCart }) {
  function onAddToCart() {
    addToCart(itemData.id);
  }

  return (
    <div className={styles.itemCard}>
      <div className={styles.itemHeader}>
        <Link to={`/product/${itemData.id}`}>
          <div className={styles.imageContainer}>
            <div className={styles.image}>
              <img src={itemData.image} alt={itemData.title} />
            </div>
          </div>
        </Link>
        <div className={styles.cartButtonContainer}>
          <button className={styles.cartButton} onClick={onAddToCart}>
            ADD TO CART
          </button>
        </div>
      </div>
      <div className={styles.itemBody}>
        <div className={styles.rating}>
          <div className={styles.iconContainer}>
            <div className={styles.icon}>⭐</div>
          </div>
          {itemData.rating.rate} ({itemData.rating.count})
        </div>
        <Link to={`/product/${itemData.id}`}>
          <div className={styles.title}>{itemData.title}</div>
        </Link>
        <div className={styles.category}>
          <Link to={`/catalogue/category/${itemData.category}`}>
            {itemData.category}
          </Link>
        </div>
        <div className={styles.price}>${itemData.price}</div>
      </div>
    </div>
  );
}

export default ItemCard;
