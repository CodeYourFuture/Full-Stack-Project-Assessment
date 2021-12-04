import "./App.css";
import Header from "./components/Header";
import Cards from "./components/cards";
import sampleData from "./data/sampleData.json";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        {sampleData.map((video, index) => (
          <Cards key={index} data={video} />
        ))}
      </div>
    </div>
  );
}

export default App;
