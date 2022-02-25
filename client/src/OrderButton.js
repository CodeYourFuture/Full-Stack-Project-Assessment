import React, { useState } from "react";

const types = ["Most UpVotes", "Total Votes", "Balanced Score"];

const OrderButton = (props) => {
  const [active, setActive] = useState(types[0]);

  return (
    <div>
      <h2 className="add-video-title">Sort Videos by:</h2>
      {types.map((type) => (
        <button
          key={type}
          active={active === type}
          onClick={() => setActive(type)}
        >
          {type}
        </button>
      ))}
      <p className="add-video-title">
        {" "}
        The videos are currently sorted by: {active}{" "}
      </p>
    </div>
  );
};

export default OrderButton;
