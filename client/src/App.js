import "./style/App.css"; // import master CSS file
import VideoCards from "./components/VideoCards";

const App = () => {
  return (
    <div id="whole-page" className="App">
      <header id="page-header" className="page-header">
        <h1 id="first-heading" className="first-heading">
          Videos!
        </h1>
      </header>
      <main id="main-content">
        <VideoCards />
      </main>
    </div>
  );
};

export default App;
