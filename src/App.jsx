import "./App.css";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";
import useFetchData from "./hooks/useFetchData";

function App() {
  const { data, loading, error } = useFetchData();

  return (
    <div className="body">
      <Header />
      <main>
        <Outlet context={{ data, loading, error }} />
      </main>
    </div>
  );
}

export default App;
