import { Link, useOutletContext } from "react-router-dom";
import QuantitySelector from "../quantity/QuantitySelector";

function CartItem({ itemData, quantity }) {
  const { setItemCount } = useOutletContext();

  function onAddClick() {
    setItemCount(itemData.id, quantity + 1);
  }

  function onSubClick() {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setItemCount(itemData.id, newQuantity);
  }

  return (
    <div className="cart-item">
      <div className="delete-button-container">
        <button
          className="delete"
          aria-label="Remove from cart"
          onClick={() => {}}
        >
          delete-icon
        </button>
      </div>
      <div className="item-image">
        <div className="image-container">
          <div className="image">
            <img src={itemData.image} alt={itemData.title} />
          </div>
        </div>
      </div>
      <div className="item-info">
        <Link to={`/product/${itemData.id}`}>
          <div className="title">
            <h3>{itemData.title}</h3>
          </div>
        </Link>
        <div className="description">
          <div className="title">{itemData.description}</div>
        </div>
      </div>
      <div className="item-quantity">
        <QuantitySelector
          onAddClick={onAddClick}
          onSubClick={onSubClick}
          quantity={quantity}
        />
      </div>
      <div className="sub-total">
        <div className="sub-total">${itemData.price * quantity}</div>
      </div>
    </div>
  );
}

export default CartItem;
