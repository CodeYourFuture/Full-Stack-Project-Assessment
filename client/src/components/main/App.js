import React from "react";
import "../../styles/App.css";
import Context from "../../context/Context";
import VideoCards from "../public/VideoCards";

function App() {
  return (
    <Context>
      <VideoCards />
    </Context>
  );
}

export default App;
