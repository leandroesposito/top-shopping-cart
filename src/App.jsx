import "./App.css";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";
import useFetchData from "./hooks/useFetchData";
import useCart from "./hooks/useCart";

function App() {
  const { data, loading, error } = useFetchData();
  const { getTotalItems, addToCart } = useCart();

  return (
    <div className="body">
      <Header getTotalItems={getTotalItems} />
      <main>
        <Outlet context={{ data, loading, error, addToCart }} />
      </main>
    </div>
  );
}

export default App;
