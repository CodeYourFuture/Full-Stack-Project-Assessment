import React from "react";
const OrderButton = (props) => {
  return (
    <div>
      <h6>Sort By Rating</h6>
      <button onClick={props.order} className="btn btn-primary mt-1">
        DESC/ASC
      </button>
    </div>
  );
};
export default OrderButton;
