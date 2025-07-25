import { useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import QuantitySelector from "../quantity/QuantitySelector";
import styles from "./Product.module.css";

function Product({ itemId }) {
  const [quantity, setQuantity] = useState(1);
  const { data, loading, addToCart } = useOutletContext();
  const { id } = useParams() || { id: itemId };
  const itemData = data[id];

  function onAddClick() {
    setQuantity((q) => q + 1);
  }

  function onSubClick() {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  }

  function onAddToCartClick() {
    addToCart(id, quantity);
  }

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div>
      <div className="title">
        <h2>Product</h2>
      </div>
      <div className={styles.product}>
        <div className={styles.left}>
          <div className={styles.imageContainer}>
            <div className={styles.image}>
              <img src={itemData.image} alt={itemData.title} />
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            <h3>{itemData.title}</h3>
          </div>
          <div className={styles.price}>$ {itemData.price}</div>
          <div className={styles.rating}>
            <div className={styles.iconContainer}>
              <div className={styles.icon}>⭐</div>
            </div>
            {itemData.rating.rate} ({itemData.rating.count})
          </div>
          <div className={styles.category}>
            <div className={styles.subtitle}>Category</div>
            <Link to={`/catalogue/category/${itemData.category}`}>
              {itemData.category}
            </Link>
          </div>
          <div className={styles.quantity}>
            <div className={styles.subtitle}>Quantity</div>
            <QuantitySelector
              quantity={quantity}
              onAddClick={onAddClick}
              onSubClick={onSubClick}
            />
          </div>
          <div className={styles.buttons}>
            <button className={styles.cartButton} onClick={onAddToCartClick}>
              Add to cart
            </button>
          </div>
          <div className={styles.description}>{itemData.description}</div>
        </div>
      </div>
    </div>
  );
}

export default Product;
