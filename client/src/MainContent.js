import React from "react";
import "./App.css";
import Cards from "./Cards";


function MainContent() {
    return (
      <div className="MainContent">
       <h2>Your saved videos</h2>
       <Cards/>     
       </div>
    );
  }

export default MainContent;