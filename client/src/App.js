import "./App.css";
import TheVideos from"./components/TheVideos.js";
import EmbedVideos from "./components/EmbedVideos.js";
import OrderResult from "./components/OrderResult";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <hr/>
      <OrderResult/>
      <TheVideos />
     <EmbedVideos/> 
    </div>
  );
}

export default App;
