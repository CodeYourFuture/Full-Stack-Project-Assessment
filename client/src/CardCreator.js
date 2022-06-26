import React from "react";
import Card from "./Card";

const CardCreator = ({ myData, onDelete }) => {

  return (
    <>
      {myData.map((obj, index) => {
        return (
          <Card obj={obj} key={index} onDelete={onDelete} />
        )
      })}
    </>
  )
}

export default CardCreator;