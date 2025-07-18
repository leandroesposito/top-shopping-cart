import { useOutletContext } from "react-router-dom";
import CartItem from "../cartItem/CartItem";

function Cart() {
  const { data, cart } = useOutletContext();

  return (
    <div className="cart">
      {Object.entries(cart).map((item) => {
        const [id, quantity] = item;
        const intId = parseInt(id);
        return (
          <CartItem key={intId} itemData={data[intId]} quantity={quantity} />
        );
      })}
    </div>
  );
}

export default Cart;
