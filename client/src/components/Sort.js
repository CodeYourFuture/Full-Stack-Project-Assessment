import React from "react";

const Sort = ({ sortOrder, onToggleSortOrder }) => {
  const handleToggleSortOrder = () => {
    onToggleSortOrder();
  };

  return (
    <div className="sort">
      <button onClick={handleToggleSortOrder}>
        {sortOrder === "desc" ? "Descending" : "Ascending"}
      </button>
    </div>
  );
};

export default Sort;
