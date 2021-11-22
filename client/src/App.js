import "./App.css";
import VideoDisplay from "./components/VideoDisplay";
import videos from "./data/exampleresponse.json";
//import useState from "react";

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <main className='videos'>
      {[...videos].map((videos,index) => {
        
        return (<VideoDisplay className='display'  video={videos} index={index}/>);
      })}
          
        </main>
      
    </div>
  );
}

export default App;
