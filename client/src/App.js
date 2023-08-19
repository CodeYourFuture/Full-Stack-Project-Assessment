import "./App.css";
import AddAndSearch from "./Components/AddAndSearch";
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";
import Welcome from "./Components/Welcome";
function App() {
  return (
    <>
      <NavBar />
      <Welcome />
      <AddAndSearch />
      <Footer />
    </>
    /* <div className="App">
        <header className="App-header">
          <h1>Video Recommendation</h1>
        </header>
      </div> */
  );
}

export default App;
