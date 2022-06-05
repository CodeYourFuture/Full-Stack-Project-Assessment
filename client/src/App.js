import React from "react";
import "./App.css";
import NewVideoForm from "./components/NewVideoForm";
import VideosContainer from "./components/VideosContainer";

function App() {
  return (
    <div>
      <header>
        <h1>Video Recommendation</h1>
      </header>
      <NewVideoForm />
      <VideosContainer />
    </div>
  );
}

export default App;
