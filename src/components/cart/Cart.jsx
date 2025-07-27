import { useOutletContext } from "react-router-dom";
import CartItem from "../cartItem/CartItem";
import styles from "./Cart.module.css";

function Cart() {
  const { data, cart } = useOutletContext();

  function getSubTotal() {
    let subTotal = 0;

    for (const cartItem of Object.entries(cart)) {
      const [id, quantity] = cartItem;
      const intId = parseInt(id);
      const item = data[intId];
      const itemTotal = item.price * quantity;

      subTotal += itemTotal;
    }

    return Math.trunc(subTotal * 10) / 10;
  }

  const subTotal = getSubTotal();
  const shippingCost = 60;
  const total = subTotal + shippingCost;

  return (
    <div className={styles.cart}>
      <div className={styles.title}>
        <h2>Cart</h2>
      </div>
      <div className={styles.cartList}>
        <div className={styles.tableHeaders}>
          <div className={styles.quantityColumn}>Quantity</div>
          <div className={styles.totalColumn}>Total</div>
        </div>
        {Object.entries(cart).map((item) => {
          const [id, quantity] = item;
          const intId = parseInt(id);
          return (
            <CartItem key={intId} itemData={data[intId]} quantity={quantity} />
          );
        })}
      </div>
      <div className={styles.totals}>
        <div className={styles.row}>
          <div className={styles.label}>Subtotal: </div>
          <div className={styles.cost}>${subTotal}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Shipping: </div>
          <div className={styles.cost}>${shippingCost}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Total: </div>
          <div className={`${styles.cost} ${styles.total}`}>${total}</div>
        </div>
        <div className={styles.buttons}>
          <button>Secure Payment</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
