import "./App.css";
import Header from "./component/Header";
import Main from "./component/Main";
import Search from "./component/Search";
import Footer from "./component/Footer";

function App() {
  return (
    <div >
    <Header/>
    <div className="container">
    <Main/>
    </div>
    <Search/>
    <Footer/>
    </div>
  );
}

export default App;
