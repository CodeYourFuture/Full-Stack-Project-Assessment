import "./App.css";
import AddVideo from "./Components/AddVideo";
import Header from "./Components/Header";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <div className="App">
      <Header />
      <AddVideo />
      <Button>This is button</Button>
      <Button>This is button 2</Button>
    </div>
  );
}

export default App;
