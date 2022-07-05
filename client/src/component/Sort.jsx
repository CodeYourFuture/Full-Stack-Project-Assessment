import React from "react";

const Sort = ({ onChange }) => {
  return (
    <div className="sort">
      <label htmlFor="sort">Rating Sort:</label>
      <select
        name="sort"
        id="sort"
        onChange={(e) => onChange(e, e.target.value)}
      >
        <option value="desc">high-low</option>
        <option value="asc">low-high</option>
      </select>
    </div>
  );
};
export default Sort;
