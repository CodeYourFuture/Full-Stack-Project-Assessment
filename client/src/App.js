import "./App.css";
import exampleresponse from "./exampleresponse.json";
import Header from "./Header";
import SearchVideo from "./SearchVideo";
import AddVideo from "./AddVideo";
import DisplayVideo from "./DisplayVideo";
import {useState} from "react";



function App() {
const [inputValue, setInputValue] = useState("");

const filteredVideo = exampleresponse.filter(video => (
     video.title.toLowerCase().includes(inputValue.toLowerCase())
  )   
  )

  return (
    <div className="App">
      <Header />
      <div className="add-search">
        <div>
          <AddVideo /> 
        </div>
        <div>
         <SearchVideo inputValue={inputValue} setInputValue={setInputValue} />
        </div>
      </div>
       <DisplayVideo  filteredVideo={filteredVideo} />
    </div>
  );
}

export default App;
