import React from 'react';
import "./App.css";
import Header from './components/Header';
import videos from "./exampleresponse.json";
import AllVideoCards from './components/AllVideoCards';



function App() {
 
  return (
    <div className="App">
      <Header videos={videos} />
      <AllVideoCards videos={videos} />
    </div>
  );
}

export default App;
