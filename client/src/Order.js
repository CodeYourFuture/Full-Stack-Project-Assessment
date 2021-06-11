import React from "react";

export default function Order({ order, setOrder }) {
  return (
    <div>
      <button
        onClick={() => {
          setOrder(true);
          if (order === "desc") {
            setOrder("asc");
          }
          if (order === "asc") {
            setOrder("desc");
          }
        }}
        className="btn btn-primary mb-3"
      >
        {order}
      </button>
    </div>
  );
}
