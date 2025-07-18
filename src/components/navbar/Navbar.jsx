import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="catalogue">Catalogue</Link>
      <Link to="cart">Cart</Link>
    </nav>
  );
}

export default Navbar;
