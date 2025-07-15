import Search from "../search/Search";
import Navbar from "../navbar/Navbar";
import CartIcon from "../cartIcon/CartIcon";

function Header({ getTotalItems }) {
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
        <CartIcon cartCount={getTotalItems()} />
      </div>
    </header>
  );
}

export default Header;
