import "./App.css";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";
import useData from "./Data";

function App() {
  const { data, loading, error } = useData();

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
