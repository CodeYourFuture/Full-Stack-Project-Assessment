import "./App.css";
import MainCard from "./components/MainCard";
import AllButtons from "./components/AllButtons"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <MainCard />
        <AllButtons />
      </header>
    </div>
  );
}

export default App;
