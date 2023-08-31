import "./App.css";
import AllButtons from "./components/AllButtons";
import Nav from "./components/Nav";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Nav />
      </header>
      <h1>Video Recommendation</h1>
      <AllButtons />
      <Contact />
    </div>
  );
}

export default App;
