import React from 'react';
import YoutubeForm from './component/YoutubeForm';
import Youtube from './component/Youtube';
import "./App.css";
import YoutubeVidContextProvider from './contexts/YoutubeVidContext';

export default function App() {
  
  return (
    <div className="App">
      <YoutubeVidContextProvider>
        <header className="App-header">
          <h1>Video Recommendation</h1>
        </header>
        <YoutubeForm />
        <Youtube />
        
      </YoutubeVidContextProvider>
    </div>
  );
}

 
