import React from "react";
import "./App.css";
import MainContainer from "./components/MainContainer";
import youtubeLogo from "./components/images/youtubeLogo.png";

const App = () => {
  return (
    <div className="App text-left">
      <div className="font-semi-bold flex flex-row justify-center pt-8 text-5xl">
        <img src={youtubeLogo} alt="Logo" className="h-13 mx-7 w-20" />
        <h1>Video Recommendations</h1>
      </div>
      <MainContainer />
    </div>
  );
};

export default App;
