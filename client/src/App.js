import "./App.css";
import React from "react";
import Video from "./component/Video";
import Header from "./component/Header";
import AddVideo from "./component/Addvideo";
import data from "./exampleresponse.json";
function App() {
  return (
    <div className="App">
      <Header />
      <AddVideo videoData={data} />
      <Video videoData={data} />
    </div>
  );
}

export default App;
