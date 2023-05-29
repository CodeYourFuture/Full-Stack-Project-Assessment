import "./App.css";
import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import VideoPicker from "./components/VideoPicker/VideoPicker";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Categories />
        <VideoPicker />
      </main>
      <Footer />
    </div>
  );
}

export default App;
