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
