import React from "react";
import data from "../data";

function SearchBar({ handleSearch }) {
  return (
    <div className="search">
      {/* <label></label> */}
      <input
        className="search-input"
        type="text"
        placeholder="search videos..."
        onKeyUp={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
}

// function SearchBar() {
//   const [filteredList, setFilteredList] = React.useState(data);

//   function handleSearch(searchTerm) {
//     const newList = data.filter((item) => item.title.includes(searchTerm));
//     console.log("setting filtered list", newList);
//     console.log(`search term is ${searchTerm}`);
//     setFilteredList(newList);
//   }
//   return (
//     <div className="search">
//       <form action="/" method="get">
//         <label htmlFor="header-search">
//           <span className="visually-hidden">Search videos</span>
//         </label>
//         <input
//           type="text"
//           className="search-input"
//           id="header-search"
//           placeholder="Search videos..."
//           onKeyUp={(e) => {
//             handleSearch(e.target.value);
//           }}
//         />
//         {/* <button type="submit">Search</button> */}
//       </form>
//     </div>
//   );
// }

export default SearchBar;
