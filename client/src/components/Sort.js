import React from "react";

const Sort = ({ onChange }) => {
  const handleSort = (event) => {
    const selectedVal = event.target.value;
    onChange(selectedVal);
  };

  return (
    <div className="sort">
      <label htmlFor="sort">Rating Sort:</label>
      <select name="sort" id="sort" onChange={handleSort}>
        <option value="desc">High-Low</option>
        <option value="asc">Low-High</option>
      </select>
    </div>
  );
};

export default Sort;
