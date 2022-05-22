import React, { useState } from "react";
import Package from "../data/exampleresponse.json";
import OrderResult from "./OrderResult";
import ReactPlayers from "./ReactPlayers";
import NewVideos from "./NewVideos";

const TheVideos = ({ lik}) => {
  const [allVoted, setAllVoted] = useState(0);

  const [videos, setVideos] = useState("");
  
  const handleVote = () => {
    console.log(setAllVoted);
    setAllVoted(allVoted + 1);
  };
  function addButton(){

   let addtoButton = document.querySelector("#firstButton");
   if(addtoButton){

     addtoButton.addEventListener("click", () => {
       alert("hello");
      return  document.body.style.backgroundColor = "blue";
      });
    }
  }
  addButton();
  function deletButton(){

    let deltButton = document.querySelector("#secondButton");
    let classContainer = document.querySelector(".allVideos");

    let idsearch = document.querySelector("#search");

    if(deltButton){
 
      deltButton.addEventListener("click", () => {
        let pragraph = document.createElement("p");
        pragraph.classList.add(pragraph.styling);
        pragraph.innerText = idsearch.value;
        classContainer.appendChild(pragraph);
        idsearch.value = "";
        console.log(pragraph);
       return  document.body.style.backgroundColor = "blue";
       });
     }
   }
   deletButton();
  return (
    <div className="div2">
      <OrderResult/>
      <label id="search">
        <input
          id="search"
          name="search"
          value={videos}
          placeholder="search you video"
          onChange={(e) => setVideos(e.target.value)}
        />
      </label>
      {Package.filter((val) => {
        if (allVoted === "") {
          return val;
        } else if (val.title.toLowerCase().indexOf(videos) > -1) {
          return val;
        }else{
          return null;
        }
        }).map((lik, i) => {
        return (
          <div className="allVideos"  key={i}>
            <h2>{lik.title}</h2>
            <p>
              {" "}
              {lik.id} " {lik.rating}
            </p>
            <button
              id="clickButton"
              onClick={handleVote}
              type="button"
              className="btn btn-primary"
            >
              {" "}
              like {<i class="fas fa-thumbs-up"></i>} :{allVoted}
            </button>   
            {<ReactPlayers   orl={lik.url} />}

            <div className="firstP">  {<NewVideos />} </div>
               </div>
               
           );
         })}  
         
      </div>
  );};

export default TheVideos;
