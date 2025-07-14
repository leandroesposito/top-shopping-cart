function ItemCard({ itemData, addToCart }) {
  function onAddToCart() {
    addToCart(itemData.id);
  }

  return (
    <div className="item-card">
      <div className="item-header">
        <div className="image-container">
          <div className="image">
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
      <div className="item-body">
        <div className="rating">
          <div className="icon-container">
            <div className="icon">star-icon</div>
          </div>
          {itemData.rating.rate} ({itemData.rating.count})
        </div>
        <div className="title">{itemData.title}</div>
        <div className="price">${itemData.price}</div>
      </div>
    </div>
  );
}

export default ItemCard;
