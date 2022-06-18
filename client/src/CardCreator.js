import React, { useState } from "react";
import Response from "./exampleresponse.json";

const myData = Response;



const CardCreator = () => {

  const [vote, setVote] = useState(0);

  function Vote() {
    setVote(current => {
      return current + 1;
    });
  }

  function Button(props) {
    return (
      <button className="button" onClick={props.handleClick}>
        {props.voteType} {vote}
      </button>
    )
  }

  return (
    <>
      {myData.map((obj, index) => {

        const embeddedVid = obj.url.replace('watch?v=', 'embed/');

        return (
          <div className="card" key={index}>
            <p>{obj.title}</p>
            <iframe width="400" height="250"
              src={embeddedVid}
              title={obj.title} frameBorder="0"
              allow="accelerometer; autoplay;
              clipboard-write; encrypted-media; gyroscope;
              picture-in-picture" allowFullScreen>
            </iframe>

            <div>
              <Button handleClick={Vote} voteType={"Like"} />
              <Button handleClick={Vote} voteType={"Dislike"} />
              <button className="button">Delete</button>
            </div>
          </div>
        )
      }
      )}
    </>
  )
}

// function Order(props) {
//   const [order, setOrder] = useState(0);

//   function orderOne() {
//     setOrder(current => {
//       return current + 1;
//     });
//   }

//   return (
//     <li className="pizzas">
//       {props.orderType}: {order}
//       <RestaurantButton handleClick={orderOne} />
//     </li>
//   );
// }

// // Button Component
// function RestaurantButton(props) {
//   return (
//     <button className="btn btn-primary" onClick={props.handleClick}>
//       Add
//     </button>
//   );
// }

export default CardCreator;