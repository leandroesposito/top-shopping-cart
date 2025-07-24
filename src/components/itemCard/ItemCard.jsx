import { Link } from "react-router-dom";
import styles from "./ItemCard.module.css";

function ItemCard({ itemData, addToCart }) {
  function onAddToCart() {
    addToCart(itemData.id);
  }

  return (
    <div className="item-card">
      <Link to={`/product/${itemData.id}`}>
        <div className="item-header">
          <div className="image-container">
            <div className={styles.image}>
              <img src={itemData.image} alt={itemData.title} />
            </div>
          </div>
          <div className="cart-button-container">
            <button
              className="cart"
              aria-label="Add to cart"
              onClick={onAddToCart}
            >
              cart-icon
            </button>
          </div>
        </div>
      </Link>
      <div className="item-body">
        <div className="rating">
          <div className="icon-container">
            <div className="icon">star-icon</div>
          </div>
          {itemData.rating.rate} ({itemData.rating.count})
        </div>
        <Link to={`/product/${itemData.id}`}>
          <div className="title">{itemData.title}</div>
        </Link>
        <div className="category">
          <Link to={`/catalogue/category/${itemData.category}`}>
            {itemData.category}
          </Link>
        </div>
        <div className="price">${itemData.price}</div>
      </div>
    </div>
  );
}

export default ItemCard;
