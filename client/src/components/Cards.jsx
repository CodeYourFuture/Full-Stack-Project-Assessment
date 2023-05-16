import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Cards.css";
import TopBar from "./TopBar";

const Cards = () => {
  const [cards, setCards] = useState([]);
  const [order, setOrder] = useState("desc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // Set loading state to true before making the request
    fetch(`https://video-server-iiqf.onrender.com/videos?order=${order}`)
      .then((response) => response.json())
      .then((data) => {
        setCards(data);
        setLoading(false); // Set loading state to false after receiving the response
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Set loading state to false if an error occurs
      });
  }, [order]);

  const handleDeleteCard = (id) => {
    setLoading(true); // Set loading state to true before sending the delete request
    fetch(`https://video-server-iiqf.onrender.com/videos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          // Return an empty object if the response is not 200 OK
          return {};
        }
      })
      .then((deletedVideo) => {
        // Filter out the deleted card from the current cards
        const updatedCards = cards.filter(
          (card) => card.id !== deletedVideo.id
        );
        setCards(updatedCards);
        setLoading(false); // Set loading state to false after deleting the video
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Set loading state to false if an error occurs
      });
  };

  const handleAddCard = (newCard) => {
    setCards((prevCards) => [...prevCards, newCard]);
  };

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);
  };

  return (
    <>
      <TopBar
        onAddCard={handleAddCard}
        cards={cards}
        onOrderChange={handleOrderChange}
      />
      <div className="cards">
        {loading ? (
          <p className="loading">Loading... Please wait for my server to wake up :D</p> // Display a loading indicator while waiting for the data
        ) : cards.length > 0 ? (
          cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title.trim() !== "" ? card.title : "No Title"}
              url={card.url}
              rating={card.rating}
              date={card.date}
              onDelete={handleDeleteCard}
            />
          ))
        ) : (
          <p className="no-video">No video available.</p>
        )}
      </div>
    </>
  );
};

export default Cards;
