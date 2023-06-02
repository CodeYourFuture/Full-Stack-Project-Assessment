import React, { useState, useEffect } from "react";
import CardItem from "./CardItem"
import "./CardList.css";
import AppBar from "./AppBar";

const CardList = () => {
  const [cards, setCards] = useState([]);
   useEffect(() => {
     fetch("http://localhost:5000/videos")
       .then((response) => response.json())
       .then((data) => setCards(data))
       .catch((error) => console.log(error));
   }, []);
  // Sort the cards array based on the rating property
  const sortedCards = [...cards].sort((a, b) => b.rating - a.rating);
  const handleDeleteCard = (id) => {
    // Send a DELETE request to the server
    fetch(`http://localhost:5000/videos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((deletedVideo) => {
        // Filter out the deleted card from the current cards
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
      <AppBar onAddCard={handleAddCard} cards={cards} />
      {/*  Render a container div with the CSS class "cards". // Map through the sortedCards array and render a Card component for each card object. 
      Pass the necessary props to the Card component, including id, title, url, rating, date, and onDelete event handler. // Close the parent div element. */}
      <div className="cards">
        {sortedCards.map((card) => (
          <CardItem
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
export default CardList;
