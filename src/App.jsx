import "./App.css";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";
import useFetchData from "./hooks/useFetchData";
import useCart from "./hooks/useCart";

function App() {
  const { data, loading, error } = useFetchData();
  const { getCart, getTotalItems, addToCart, setItemCount } = useCart();

  return (
    <div className="body">
      <Header getTotalItems={getTotalItems} />
      <main>
        <Outlet
          context={{
            data,
            loading,
            error,
            addToCart,
            cart: getCart(),
            setItemCount,
          }}
        />
      </main>
    </div>
  );
}

export default App;
