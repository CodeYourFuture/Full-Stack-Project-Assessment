import React, { useState } from "react";

function Votes({ data }) {
//   console.log(data);
  const [count, setCount] = useState(data ? data : 0);

  const incrementCount = () => {
    setCount((prevState) => prevState + 1);
  };

  const decrementCount = () => {
    setCount((prevState) => prevState - 1);
  };

  return (
    <>
      <div className="votes">
        <i className="fas fa-thumbs-up vote" onClick={incrementCount}></i>
        <h4>{count ? count : 0} votes</h4>
        <i onClick={decrementCount} className="fas fa-thumbs-down vote"></i>
      </div>
    </>
  );
}

export default Votes;
