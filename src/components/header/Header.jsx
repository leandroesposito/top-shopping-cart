import Search from "../search/Search";

function Header({ cartCount }) {
  return (
    <header>
      <div className="title">
        <h1>IShop</h1>
      </div>
      <Search />
    </header>
  );
}

export default Header;
