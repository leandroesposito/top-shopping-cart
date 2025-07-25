import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Search.module.css";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  function onSearchChange(event) {
    const newSearchValue = event.target.value;
    setSearchValue(newSearchValue);
    runSearch(newSearchValue);
  }

  function runSearch(searchValue) {
    if (searchValue) {
      navigate(`/search/${searchValue}`);
    } else {
      navigate(`/catalogue`);
    }
  }

  return (
    <div role="search" className={styles.searchContainer}>
      <input
        placeholder="Search"
        onChange={onSearchChange}
        value={searchValue}
        aria-label="search"
        name="search"
      ></input>
    </div>
  );
}

export default Search;
