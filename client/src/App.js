import React from 'react';
import "./App.css";
import MainContainer from './components/MainContainer';

const App = () => {
  
  return (
    <div className="text-left App">
      <header className="text-5xl text-indigo-500 font-bold text-center">
        <h1>Video Recommendation</h1>
      </header>
      <MainContainer/>
    </div>
  );
}

export default App;
