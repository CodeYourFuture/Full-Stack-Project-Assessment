import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Cards.css";
import TopBar from "./TopBar";


const Cards = () => {
  const [cards, setCards] = useState([]);
  const [order, setOrder] = useState("desc");


  useEffect(() => {
    fetch(`http://localhost:5000/videos?order=${order}`)
      .then((response) => response.json())
      .then((data) => setCards(data))
      .catch((error) => console.log(error));
  }, [order]);
  

  
  const handleDeleteCard = (id) => {
    // Send a DELETE request to the server
    fetch(`http://localhost:5000/videos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((deletedVideo) => {
        
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
  
  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);
  };

  return (
    <>
      {/* <TopBar onAddCard={handleAddCard} cards={cards} /> */}
      <TopBar
        onAddCard={handleAddCard}
        cards={cards}
        onOrderChange={handleOrderChange}
      />
      <div className="cards">
        {cards.map((card) => (
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
