import React, { useState } from "react";

const OrderList = ({handleSortButton}) => {
    const [isAsc, setIsAsc]=useState(true);
const handleClickButton=()=>{
    setIsAsc(!isAsc);
    handleSortButton(isAsc);
}
  return (
    <div className="col-1 my-5">
      <button className="btn btn-primary" onClick={handleClickButton}> Sort </button>
    </div>
  );
};
export default OrderList;
