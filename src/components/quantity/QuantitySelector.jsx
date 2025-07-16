function QuantitySelector({ quantity, onAddClick, onSubClick }) {
  return (
    <div className="quantity-selector">
      <button aria-label="substract" onClick={onSubClick}>
        -
      </button>
      <div className="value">{quantity}</div>
      <button aria-label="add" onClick={onAddClick}>
        +
      </button>
    </div>
  );
}

export default QuantitySelector;
