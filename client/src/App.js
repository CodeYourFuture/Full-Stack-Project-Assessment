import "./App.css";
import Header from './components/Header';
import Search from './components/Search';
import Videos from './components/Videos';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="inputData">
        <Search/>
        <Videos/>
      </div>
    </div>
  );
}

export default App;
