import { useState } from "react";

function Search({ onSearch }) {
  const [search, setSearch] = useState();
  const handleSearch = () => {
    if (search) {
      onSearch(search);
    } else {
      alert("please enter a search term");
    }
  };

  return (
    <div>
      <input onChange={(e) => setSearch(e.target.value)}></input>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Search;
