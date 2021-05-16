import "./App.css";
import Videos from "./component/Videos";

import data from "./data/exampleresponse.json"

function App() {

  console.log(data)
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-white bg-primary">Video Recommendation</h1>
      </header>
    <Videos data ={data}/>
    </div>
  );
}

export default App;
