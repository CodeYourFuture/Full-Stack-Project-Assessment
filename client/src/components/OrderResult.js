import React, { useState } from "react";
import NewVideos from "./NewVideos";
//import ReactPlayer from "react-player";
// import YouTube  from "react-youtube";
// var  reactyoutubeId = require("get-youtube-id");

//import Axios from "./axios";
//import Package from "../data/exampleresponse.json";

const OrderResult = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  //const [result, setResult] = useState("");
  function addButton() {

    let addtoButton = document.querySelector("#firstButton");
    if (addtoButton) {

      addtoButton.addEventListener("click", () => {
        alert("hello");
        return document.body.style.backgroundColor = "red";
      });
    }
  };
  function deletButton({ orl }) {
    let deltButton = document.querySelector("#secondButton");
    let classContainer = document.querySelector(".allVideos");
    let idsearch = document.querySelectorAll("#form-1 input");

    if (deltButton) {
      deltButton.addEventListener("click", () => {
        let divpragraph = document.createElement("div");
        let headerpragraph = document.createElement("h2");

        let divp = document.createElement("p");
        divpragraph.appendChild(divp);
        divp.innerHTML = idsearch.value;        
        headerpragraph.innerHTML = idsearch.value;
        divpragraph.appendChild(headerpragraph);

        let iframe = document.createElement("iframe");
        iframe.src={ orl };
        divpragraph.appendChild(iframe);
        iframe.classList.add("pragraphs");
        iframe.innerText = idsearch.value;
        classContainer.appendChild(divpragraph);
        idsearch.value = " ";
        console.log(iframe);
        <br />

        let divbutton = document.createElement("button");
        divbutton.style.backgroundColor = "blue";
        divbutton.style.Color = "white";
        divpragraph.appendChild(divbutton);
        divbutton.innerText = "delete";
        divp.innerHTML = idsearch.value;
        <>
          <NewVideos />
        </>

        // document.body.style.backgroundColor = "blue";

        iframe.addEventListener("dblclick", () => {
          classContainer.remove(divpragraph);
        });
      });
    }
    // deltButton.addEventListener("click", ()=>{

    //   let pragrap = document.createElement("h3");
    //   pragrap.innerText = idsearch.value;
    //   pragrap.classList.add(pragrap.styling);

    //   classContainer.appendChild(pragrap);
    //   idsearch.value = "";
    // })

  }
  // {/*const opts = {
  //   height: '390',
  //   width: '640',
  //   playerVars: {
  //     // https://developers.google.com/youtube/player_parameters
  //     autoplay: 0,
  //   },
  // };*/}


  const clickHandle = (e) => {
    console.log(e.target.value);
    if (e.target.name === "title") {
      setTitle(e.target.value)

    } else if (e.target.name === "url") {
      console.log(e.target.value);
      setUrl(e.target.value)
      // setResult(reactyoutubeId(e.target.value));
    }
  };
  let newClick;
  function clickButton() {
    if (newClick === 1) {
      document.getElementById("form-1").style.display = "inline";
      return newClick = 0;
    } else {
      document.getElementById("form-1").style.display = "none";
      return newClick = 1;
    }
  }

  function submit(e) {
    e.preventDefault();
    setTitle("");
    setUrl("");
    console.log("the server running ");

    //setAdded(e.target.value)
    fetch("http://localhost:5000/datas/", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        url: url,
      }),
      headers: { "content-type": "application/json" },
    });
  }

  return (
    <div className="the-button">
      <button onClick={clickButton} id="h4-1" className="btn btn-primary">add videos</button>

      <form id="form-1" onSubmit={submit}>
        <label id="firstId">
          <input
            id="lable-1"
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={clickHandle}
          />
        </label><br />
        <label id="secondId">
          <input
            id="lable-2"
            type="text"
            name="url"
            placeholder="url"
            value={url}
            onChange={clickHandle}
          />
        </label>


        <br />
        <button onClick={addButton} type="submit" id="firstButton" className="btn btn-primary" >
          Cancel
        </button>
        <button onClick={deletButton} type="submit" id="secondButton" className="btn btn-primary" >
          Add
        </button>
      </form>

      {/* <YouTube videoId={result} opts={opts}  />;*/}

    </div>

  );
};

export default OrderResult;
