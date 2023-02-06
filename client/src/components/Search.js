// function Search() {
//   return (
//     <div>
//       <label htmlFor="search">Search</label>
//       <input type="text" name="search" id="search" />
//     </div>
//   );
// }
// export default Search;
import React, { useState } from "react";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search</label>
      <input
        type="text"
        name="search"
        id="search"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;
