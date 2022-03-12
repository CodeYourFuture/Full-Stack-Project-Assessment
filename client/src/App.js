import React from "react";
import "./App.css";
import Header from "./Header.js";
import "bootstrap/dist/css/bootstrap.min.css";
import AllVideoCards from "./AllVideoCards";
import Footer from "./Footer";

function App() {
  return (
    <div className="App bg-dark bg-gradient">
      <Header />
      <AllVideoCards />
      <Footer />
    </div>
  );
}

export default App;
