import React from "react";

function OrderButton({ toggleButton }) {
  return (
    <div className="mb-6 ">
      <button type="button" className="btn btn-success" onClick={toggleButton}>
        Order Ratings
      </button>
    </div>
  );
}

export default OrderButton;
