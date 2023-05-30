import Videos from "./Comp/Videos";
import AddVid from "./Comp/AddVid";
function App() {
  return (
    <div >
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVid />
      <Videos />
    </div>
  );
}

export default App;
