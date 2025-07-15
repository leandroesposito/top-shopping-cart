import ItemCard from "../itemCard/ItemCard";
import { useOutletContext } from "react-router-dom";

function Catalogue() {
  const { data, loading, error, addToCart } = useOutletContext();

  return (
    <div className="catalogue">
      {data.map((item) => (
        <ItemCard key={item.id} itemData={item} addToCart={addToCart} />
      ))}
    </div>
  );
}

export default Catalogue;
