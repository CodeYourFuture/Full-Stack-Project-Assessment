import React from "react";

function SortButton({sort, setSort}) {

  const handleSort = () => {
    if (sort === "Up") {
      setSort("Down");
    } else {
      setSort("Up");
    }
  };

  return (
    <div>
      <button onClick={handleSort}>{sort}</button>
    </div>
  );
}

export default SortButton;
