import ItemCard from "../itemCard/ItemCard";
import { useOutletContext, useParams } from "react-router-dom";
import styles from "./Catalogue.module.css";

function Catalogue() {
  const { data, loading, error, addToCart } = useOutletContext();
  const { category, search } = useParams();

  function isCategory(item, category) {
    return !category || item.category === category;
  }

  function fulfillsSearch(item, searchTerm) {
    if (!searchTerm) {
      return true;
    }

    const itemContent =
      `${item.title} ${item.description} ${item.category}`.toLowerCase();
    const searchTerms = searchTerm.toLowerCase().split(" ");

    return searchTerms.every((s) => itemContent.includes(s));
  }

  return (
    <div className={styles.catalogue}>
      {Object.values(data)
        .filter((item) => isCategory(item, category))
        .filter((item) => fulfillsSearch(item, search))
        .map((item) => (
          <ItemCard key={item.id} itemData={item} addToCart={addToCart} />
        ))}
    </div>
  );
}

export default Catalogue;
