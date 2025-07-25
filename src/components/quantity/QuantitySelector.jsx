import styles from "./QuantitySelector.module.css";

function QuantitySelector({ quantity, onAddClick, onSubClick }) {
  return (
    <div className={styles.quantitySelector}>
      <button aria-label="substract" onClick={onSubClick}>
        -
      </button>
      <div className={styles.value} aria-label="value">
        {quantity}
      </div>
      <button aria-label="add" onClick={onAddClick}>
        +
      </button>
    </div>
  );
}

export default QuantitySelector;
