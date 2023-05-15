import React from "react";
import Header from "./components/Header";
import VCard from "./components/VCard";
import videos from "./exampleresponse.json";
import AddVideo from "./components/AddVideo";

const App = () => {
  return (
    <div className="App">
      <Header />
      <AddVideo videoData={videos} />
      <VCard data={videos} />
    </div>
  );
};
export default App;
