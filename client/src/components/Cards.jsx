import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Cards.css";
import TopBar from "./TopBar";
const Cards = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/videos")
      .then((response) => response.json())
      .then((data) => setCards(data))
      .catch((error) => console.log(error));
  }, []);
  // Arrange the array of cards in ascending order based on the rating property:
  const sortedCards = [...cards].sort((a, b) => b.rating - a.rating);
  const handleDeleteCard = (id) => {
    // Send a DELETE request to the server
    fetch(`http://localhost:5000/videos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((deletedVideo) => {
        // Exclude the deleted card from the existing cards.
        const updatedCards = cards.filter(
          (card) => card.id !== deletedVideo[0].id
        );
        setCards(updatedCards);
      })
      .catch((error) => console.log(error));
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
