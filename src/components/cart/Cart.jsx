import { useOutletContext } from "react-router-dom";
import CartItem from "../cartItem/CartItem";

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
    <div className="cart">
      <div className="title">
        <h2>Cart</h2>
      </div>
      <div className="cart-list">
        {Object.entries(cart).map((item) => {
          const [id, quantity] = item;
          const intId = parseInt(id);
          return (
            <CartItem key={intId} itemData={data[intId]} quantity={quantity} />
          );
        })}
      </div>
      <div className="totals">
        <div className="row">
          <div className="label">Subtotal: ${subTotal}</div>
          <div className="cost"></div>
        </div>
        <div className="row">
          <div className="label">Shipping: </div>
          <div className="cost">${shippingCost}</div>
        </div>
        <div className="row">
          <div className="label">Total: </div>
          <div className="cost total">${total}</div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
