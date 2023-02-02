import React from "react";

const AscDesc = ({ handleClick, isAscending }) => {
  return (
    <div>
      <button
        onClick={handleClick}
        className="btn btn-secondary  mt-3 mb-4 shadow rounded"
      >
        {isAscending ? "Ascending" : "Descending"}
      </button>
    </div>
  );
};

export default AscDesc;

// import React, { useState } from "react";

// const AscDesc = ({ sort, setSort }) => {
//   const [display, setDisplay] = useState(false);

//   const sortHandler = () => {
//     !display ? setDisplay(true) : setDisplay(false);
//     setSort(sort === "asc" ? "desc" : "asc");
//   };
//   return (
//     <div>
//       <button
//         onClick={() => sortHandler(sort)}
//         className="btn btn-secondary  mt-3 mb-4 shadow rounded"
//       >
//         {!display ? "Ascending" : "Descending"}
//       </button>
//     </div>
//   );
// };

// export default AscDesc;
