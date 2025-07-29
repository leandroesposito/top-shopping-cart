import ItemCard from "../itemCard/ItemCard";
import { useOutletContext, useParams } from "react-router-dom";
import styles from "./Catalogue.module.css";
import Loading from "../loading/Loading";
import Error from "../error/Error";

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

  if (error) {
    return <Error error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.catalogue}>
      <div className={styles.title}>
        <h2>Catalogue</h2>{" "}
        {category && (
          <span className={styles.category}> {" > " + category}</span>
        )}
      </div>
      <div className={styles.catalogueList}>
        {Object.values(data)
          .filter((item) => isCategory(item, category))
          .filter((item) => fulfillsSearch(item, search))
          .map((item) => (
            <ItemCard key={item.id} itemData={item} addToCart={addToCart} />
          ))}
      </div>
    </div>
  );
}

export default Catalogue;
