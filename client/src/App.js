import React from "react";
import Header from "./components/Header";
import VCard from "./components/VCard";
import videos from "./exampleresponse.json";

const App = () => {
  return (
    <div className="App">
      <Header />
      <VCard data={videos} />
    </div>
  );
};
export default App;
