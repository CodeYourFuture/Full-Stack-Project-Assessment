import "./App.css";
import React from 'react'
import Footer from "./Components/Footer";
import Videos from "./Components/Videos";


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <div>
          <Videos />
        </div>
      </header>
      <Footer />
    </div>
  );
}

export default App;


