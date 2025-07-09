import { useState } from "react";

function Search({ onChange }) {
  const [searchText, setSearchText] = useState("");

  function onSearchChange(event) {
    const newValue = event.target.value;
    setSearchText(newValue);
    onChange(newValue);
  }

  return (
    <div>
      <input
        role="search"
        placeholder="Search"
        onChange={onSearchChange}
        value={searchText}
      ></input>
    </div>
  );
}

export default Search;
