import React from "react";

import "./App.css";
import Homepage from "./components/Homepage";
import Video from "./components/Video";

function App() {
  const [contacts, setContacts] = useState(Video);
  const [addFormVideo, setAddFormVideo] = useState([]);
  return (
    <div className="App">
      <div>
        <h2 className="add-video-bar">Add New Video : </h2>
        <form>
          <input
            type="text"
            name="title"
            required="required"
            placeholder="Enter video ..."
          />
        </form>
        <button type="submit" className="add-button">
          Add
        </button>
      </div>
      <Homepage />
      <Video />
    </div>
  );
}

export default App;
