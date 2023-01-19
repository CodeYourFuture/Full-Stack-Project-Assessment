import React from "react";
import Heading from "./Heading";
import Footer from "./Footer";
import MainContent from "./MainContent";
import Search from "./Search";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Heading/>
      <Search/>
      <MainContent/>
      <Footer/>
    </div>
  );
}

export default App;
