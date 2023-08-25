import React from 'react';
import "./App.css";
import MainContainer from './components/MainContainer';

const App = () => {
  
  return (
    <div className="text-left App">
      <header className="text-xl text-sky-700 font-semibold text-center">
        <h1>Video Recommendation</h1>
      </header>
      <MainContainer/>
    </div>
  );
}

export default App;
