import React, {useState, useEffect} from "react";
import "./App.css";
import VideoInfo from "./VideoInfo";
import movieData from "./movieData.json";
import SearchMovie from "./SearchMovie";
// import Iframe from "react-iframe";

function App() {
  // const [id, setId] = useState();
  const [data, setData] = useState(movieData);
  const [inputValue, setInputValue] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  const onChangeHandler = (e) => {
    setInputValue(e.target.value.toLowerCase());
  };
  // will filter all the movies in the remaining movies except the movie with the matching id
  const deleteMovie = (id) => {
    console.log(id);
    const remainingMovies = data.filter((movie) => movie.id !== id);
    setData(remainingMovies);
  };
  console.log(data);

  /* In this case our data hold either the whole list or the remainingMovies,
   and it will filtered the data against the inputValue
   */
  useEffect(() => {
    let movieList = !inputValue
      ? data
      : data.filter((movie) => movie.title.toLowerCase().includes(inputValue));
    // setFilteredMovies(movieList);
    setFilteredMovies(movieList);
  }, [inputValue, data]);

  return (
    <div className="App container-fluid">
      <nav>
        <header className="App-header text-center mt-1 bg-dark text-light ">
          <h1>Video Recommendation</h1>
        </header>
        <form action="" method="post">
          <SearchMovie handler={onChangeHandler} />
          <input type="text" />
          <input type="text" />
          <button>Add</button>
        </form>
      </nav>

      <main className="videoContainer">
        {filteredMovies.map((movie, index) => (
          <VideoInfo key={index} deleteHandler={deleteMovie} movie={movie} />
        ))}
      </main>
    </div>
  );
}

export default App;
