import "./App.css";
import Videos from "./components/Videos";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Video Recommendation</h1>
      </header>
      <Videos />
    </div>
  );
}

export default App;
