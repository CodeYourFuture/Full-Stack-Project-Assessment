import React from "react";
import { useState } from "react";
import "./App.css";

const Rating = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
  };

  const decrement = () => {
    const newCount = count - 1;
    setCount(newCount);
  };
  return (
    <div>
      <span classname="emoji" onClick={increment}>
        &#x1F44D;
      </span>{" "}
      {count}{" "}
      <span classname="emoji" onClick={decrement}>
        &#128078;
      </span>
    </div>
  );
};

export default Rating;
