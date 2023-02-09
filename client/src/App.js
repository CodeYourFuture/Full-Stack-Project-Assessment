import "./App.css";
import VideoList from "./components/VideoList";
import InputForm from "./components/InputForm";
import AddVideoButton from "./components/AddVideoButton";
import { useState } from "react";

function App() {
  const [showForm, setShowForm] = useState(false);
  


  const displayForm = () => setShowForm(true);
  const hideForm = () => setShowForm(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>

      <div className="addVideoForm">
        <AddVideoButton displayForm={displayForm} hideForm={hideForm} />
        {showForm ? <InputForm /> : null}
      </div>

      <VideoList />
    </div>
  );
}

export default App;
