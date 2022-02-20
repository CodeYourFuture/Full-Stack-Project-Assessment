import React from "react";
import "./App.css";
import Header from "./Header.js";
import "bootstrap/dist/css/bootstrap.min.css";
import AllVideoCards from "./AllVideoCards";

function App() {
  return (
    <div className="App">
      <Header />
      <AllVideoCards />
    </div>
  );
}

export default App;
