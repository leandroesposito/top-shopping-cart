import Search from "../search/Search";
import Navbar from "../navbar/Navbar";
import CartIcon from "../cartIcon/CartIcon";

function Header({ cartCount }) {
  return (
    <header>
      <div className="left">
        <Navbar />
      </div>
      <div className="middle">
        <div className="title">
          <h1>SCP</h1>
        </div>
      </div>
      <div className="right">
        <Search />
        <CartIcon cartCount={cartCount} />
      </div>
    </header>
  );
}

export default Header;
