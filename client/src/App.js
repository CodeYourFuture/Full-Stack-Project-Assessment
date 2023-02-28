import React from "react";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Videos from './components/Videos';
import "./App.css";

const App = () => {
  return (
    <div className="App">
     
      <Header />
      <Videos />
    </div>
  );
}
export default App;

