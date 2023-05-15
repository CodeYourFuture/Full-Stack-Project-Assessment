import React from "react";
import Card from "./Card";
import "./Cards.css";
import Data from "../exampleresponse.json"


const Cards = () => {
  return (
    <div className="cards">
      {Data.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          title={item.title}
          url={item.url}
          rating={item.rating}
        />
      ))}
    </div>
  );
};

export default Cards;
