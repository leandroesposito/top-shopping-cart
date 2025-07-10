function CartIcon({ cartCount }) {
  return (
    <div className="cartCount">
      <div className="iconContainer">
        <div className="icon">cart</div>
      </div>
      {cartCount ?? null}
    </div>
  );
}

export default CartIcon;
