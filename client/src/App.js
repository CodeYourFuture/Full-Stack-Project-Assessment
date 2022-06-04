import React from "react";
import "./App.css";
import Search from "./Search";


function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Video Recommendation</h1>
        </header>
        <main>
          <div>
           <Search/> 
          </div>
          
        </main>
      </div>
      
    </>
  );
}

export default App;
