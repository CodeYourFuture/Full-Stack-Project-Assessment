import React, { useState } from "react";

const Rating = (props) => {
  const [rate, setRate] = useState(props.rating);

  const increase = () => {
    setRate((rate) => rate + 1);
    ratingChange();
  };
  const decrease = () => {
    setRate((rate) => rate - 1);
    console.log("react console.log", props.ratingId);
    ratingChange();
  };
  const data = { rating: rate, id: props.ratingId };
  const ratingChange = () => {
    fetch("https://flannel-hickory-parallelogram.glitch.me/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data1) => {
        console.log("Success:", data1, rate);
      })
      .catch((error) => {
        console.log(error);
      });
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
