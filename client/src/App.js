import React from "react";

import data from "./data/exampleresponse.json";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

import "./App.css";

function App() {

  return (
    <div className="App">
      <Header />
      <Main data={data}/>
      <Footer />
    </div>
  );
}

export default App;
