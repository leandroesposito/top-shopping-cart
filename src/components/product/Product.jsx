import { useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import QuantitySelector from "../quantity/QuantitySelector";

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
    <div className="product">
      <div className="left">
        <div className="image-container">
          <div className="image">
            <img src={itemData.image} alt={itemData.title} />
          </div>
        </div>
      </div>
      <div className="right">
        <div className="title">{itemData.title}</div>
        <div className="price">${itemData.price}</div>
        <div className="rating">
          <div className="icon-container">
            <div className="icon">star-icon</div>
          </div>
          {itemData.rating.rate} ({itemData.rating.count})
        </div>
        <div className="category">
          Category
          <Link to={`catalogue/category/${itemData.category}`}>
            {itemData.category}
          </Link>
        </div>
        <div className="quantity">
          <QuantitySelector
            quantity={quantity}
            onAddClick={onAddClick}
            onSubClick={onSubClick}
          />
        </div>
        <div className="buttons">
          <button className="add-to-cart" onClick={onAddToCartClick}>
            Add to cart
          </button>
        </div>
        <div className="description">{itemData.description}</div>
      </div>
    </div>
  );
}

export default Product;
