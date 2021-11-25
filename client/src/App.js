import "./App.css";
import VideoDisplay from "./components/VideoDisplay";
import videos from "./data/exampleresponse.json";



function App() {
  

  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
       
      
        <VideoDisplay className='display'  video={videos}/>
      
          
    
      
    </div>
  );
}

export default App;
