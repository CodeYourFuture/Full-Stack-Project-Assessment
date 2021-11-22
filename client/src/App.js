import "./App.css";
import AddVideo from "./components/AddVideo";
import AllVideoContainer from "./components/AllVideoContainer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <AddVideo />
        <AllVideoContainer />
      </header>
    </div>
  );
}

export default App;
