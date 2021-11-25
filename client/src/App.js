import "./App.css";
import AllVideoContainer from "./components/AllVideoContainer";

function App() {
  return (
    <div className="App">
      <header className="p-3 mb-2 bg-warning text-dark">
        <h1>Video Recommendation</h1>
        </header>
        <AllVideoContainer />
    </div>
  );
}

export default App;
