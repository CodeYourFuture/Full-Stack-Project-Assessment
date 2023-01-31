import React, { useState } from "react";

const OrderedData = ({ data }) => {
  const [orderedData, setOrderedData] = useState(true);

  const preferedOrder = () => {
    const asc = data.sort((a, b) => a.rating - b.rating);
    const desc = data.sort((a, b) => b.rating - a.rating);

    orderedData ? setOrderedData(asc) : setOrderedData(desc);
  };
  return (
    <div>
      <button className="buttons Sort" onClick={preferedOrder}>
        Sort
      </button>
    </div>
  );
};

export default OrderedData;
