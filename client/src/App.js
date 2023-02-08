import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="video-content">
        
        <form>
          <h5>Add video</h5>
          <label for="title">Title </label>
          <input type="text" id="title" name="title" /><br></br><br></br>
          <label for= "url">URL</label>
          <input type="text" id="url" name="title"/><br></br><br></br>
          <input type="submit" value="Cancel"/> 
          <input type="submit" value="ADD" />
        </form>
        <div className="search_button">
          <button>Search </button> 
          <input type="text" placeholder="search" />
        </div>
      </div>
    </div>
  );
}

export default App;
