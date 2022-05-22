import React, {  useState } from "react";
//import Axios from "./axios";
//import Package from "../data/exampleresponse.json";

const OrderResult = (props) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  // const [searshesult, setSearhResult] = useState(
  //   {
  //     title: "",
  //     url: "",
  //   }
  // );
  
    const clickHandle = (e) => {
  //     e.preventDefault();
  //     const fieldName = e.target.getAttribite("name");
  //     const fieldValue = e.target.value;
  //     const newValue = { ...searchesult };
  //     newValue[fieldName] = fieldValue;
  //     setSearhResult(newValue);
          console.log(e);
      if(e.target.name === "title"){
        setTitle(e.target.value)
    
    }else if(e.target.name === "url"){
    setUrl(e.target.value)
  } 
 };
 let newClick ;
 function clickButton(){
if(newClick === 1){
  document.getElementById("form-1").style.display ="inline";
  return newClick = 0;
}else{
  document.getElementById("form-1").style.display= "none";
  return newClick = 1;
}
 }
    
   function  submit(e){
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
    });}

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
          </label><br/>
          <label id="secondId">
            <input
              id="lable-2"
              type="text"
              name="url"
              placeholder="url"
              value={url}
              onChange={clickHandle}
            />
          </label><br/>
        <button  type="submit" id="firstButton" className="btn btn-primary" >
          Cancel
        </button>
        <button type="submit" id="secondButton" className="btn btn-primary" >
          Add
        </button>
        </form>

      </div>
    );
  };

export default OrderResult;
