import React from "react";

export default function Order(props) {
  return (
    <div>
      <button onClick={props.orderHandler} className="btn btn-primary mb-3">
        Asc
      </button>
    </div>
  );
}
