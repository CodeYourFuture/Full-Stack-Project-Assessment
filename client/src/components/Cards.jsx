import React, { useState} from "react";
import Card from "./Card";
import "./Cards.css";
import Data from "../exampleresponse.json";
import TopBar from "./TopBar";

const Cards = () => {
  const [cards, setCards] = useState(Data);

  // Sort the cards array based on the rating property
  const sortedCards = [...cards].sort((a, b) => b.rating - a.rating);

  const handleDeleteCard = (id) => {
    // Find the index of the card with the given id
    const index = cards.findIndex((card) => card.id === id);
    if (index !== -1) {
      // Create a new array without the deleted card
      const updatedCards = [...cards];
      updatedCards.splice(index, 1);
      setCards(updatedCards);
    }
  };

  const handleAddCard = (newCard) => {
    setCards((prevCards) => [...prevCards, newCard]);
  };


  return (
    <>
      <TopBar onAddCard={handleAddCard} cards={cards} />
      <div className="cards">
        {sortedCards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title.trim() !== "" ? card.title : "No Title"}
            url={card.url}
            rating={card.rating}
            date={card.date}
            onDelete={handleDeleteCard}
          />
        ))}
      </div>
    </>
  );
};

export default Cards;
