import AddVideo from "./AddVideo";
import "./App.css";
import Video from "./Video";
import data from "./exampleresponse.json"

function App() {
  return (
    <div className="App">
      <header className="App-header">


        <h1>Video Recommendation</h1>



      </header>
      <AddVideo />



      {data.map(item =>(
        <Video info = {item}>


        </Video>
        

      ))}
      
    </div>

  );
}

export default App;
