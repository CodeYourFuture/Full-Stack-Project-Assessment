// import React, { useState } from "react";

// function SearchBar({ data }) {
//   const [searchInput, setSearchInput] = useState("");
//   const handleSearch = (e) => {
//     setSearchInput(e);
//     if (searchInput.length > 0) {
//       data.filter((video) => {
//         return video.name.match(searchInput);
//       });
//     }
//   };

//   data.map((vid, id) => {
//     <div>
//       <tr>
//         <td>{data.title}</td>
//         <td>{data.url}</td>
//       </tr>
//     </div>;
//   });

//   return (
//     <div>
//       <input type="text" placeholder="Search here" onChange={handleSearch} />
//     </div>
//   );
// }

// export default SearchBar;
