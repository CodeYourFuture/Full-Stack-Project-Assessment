import "./App.css";
import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import VideoPicker from "./components/VideoPicker/VideoPicker";
import Footer from "./components/Footer/Footer";
import AddVideoForm from "./components/AddVideoForm/AddVideoForm";

function App() {
  const categories = [
    "Comedy",
    "Music",
    "Beauty",
    "Travel",
    "Favorites",
    "Others",
  ];
  return (
    <div className="App">
      <Header categories={categories} />
      <main>
        <Categories categories={categories} />
        <AddVideoForm categories={categories} />
        <VideoPicker categories={categories} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
