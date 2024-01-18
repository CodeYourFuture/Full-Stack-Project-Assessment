import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Add from "./pages/Add";
import { createContext, useState } from "react";

export const AppContext = createContext(null);


function App() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDirecting, setIsDirecting] = useState(false);
  const [isRating, setIsRating] = useState(false);


  return (
    <AppContext.Provider value={{
      videos, setVideos, search, setSearch,
      isLoading, setIsLoading, isSearching, setIsSearching,
      isDeleting, setIsDeleting, isRating, setIsRating,
      isDirecting, setIsDirecting
    }}>

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/add" element={<Add />}></Route>
        </Routes>
      </Router>

    </AppContext.Provider >
  );
}

export default App;
