import ItemCard from "../itemCard/ItemCard";
import { useOutletContext, useParams } from "react-router-dom";

function Catalogue() {
  const { data, loading, error, addToCart } = useOutletContext();
  const { category } = useParams();

  return (
    <div className="catalogue">
      {data
        .filter((item) => !category || item.category === category)
        .map((item) => (
          <ItemCard key={item.id} itemData={item} addToCart={addToCart} />
        ))}
    </div>
  );
}

export default Catalogue;
