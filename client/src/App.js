import "./App.css";
import AddAndSearch from "./Components/AddAndSearch";
import NavBar from "./Components/NavBar";
import Welcome from "./Components/Welcome";
function App() {
  return (
    <>
      <NavBar />
      <Welcome />
      <AddAndSearch />
    </>
    /* <div className="App">
        <header className="App-header">
          <h1>Video Recommendation</h1>
        </header>
      </div> */
  );
}

export default App;
