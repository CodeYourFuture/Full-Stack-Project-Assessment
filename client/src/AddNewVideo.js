import "./App.css";

function AddNewVideo() {
  return (
    <div className="App">
      <header className="my-App-header">
        <h1>Video Recommendation</h1>
      </header>
      <body>
        <div className="upper-div">
          <button className="add-video-btn">Add Video</button>
          <label>Search</label>
          <input></input><br/>
          Title<input></input>
          URL<input></input>
          <button className="cancel-btn">Cancel</button>
          <button className="add-btn">ADD</button>
        </div>
        
      </body>
    </div>
  );
}

export default AddNewVideo;
