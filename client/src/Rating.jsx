import React, { useState } from "react";

const Rating = (props) => {
  const [rate, setRate] = useState(props.rating);
  const increase = () => {
    setRate((rate) => rate + 1);
  };
  const decrease = () => {
    setRate((rate) => rate - 1);
  };

  return (
    <>
      <div>
        <button onClick={(e) => increase()}>up</button>
        <p>{rate}</p>

        <button onClick={(e) => decrease()}>down</button>
      </div>
    </>
  );
};

export default Rating;
