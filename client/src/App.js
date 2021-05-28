import React, {useState, useEffect} from "react";
import "./App.css";
import VideoInfo from "./VideoInfo";
import movieData from "./movieData.json";
import SearchMovie from "./SearchMovie";
import AddButton from "./AddButton";
import AddMovie from "./AddMovie";
// import Iframe from "react-iframe";

function App() {
  const [data, setData] = useState([]);
  // const [data, setData] = useState(movieData);
  const [inputValue, setInputValue] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  // const [fetchedMovies, setFetchedMovies] = useState([]);

  // fetch("http://localhost:5000").then((res) =>
  //   res.json().then((data1) => {
  //     setFetchedMovies(data1);
  //     console.log(data1);
  //   })
  // );
  useEffect(() => {
    movieApi();
  }, []);

  async function movieApi() {
    const response = await fetch(`http://localhost:5000`);
    const data1 = await response.json();
    setData(data1);
  }

  const onChangeHandler = (e) => {
    setInputValue(e.target.value.toLowerCase());
  };
  // will filter all the movies in the remaining movies except the movie with the matching id
  const deleteMovie = (id) => {
    const remainingMovies = data.filter((movie) => movie.id !== id);
    setData(remainingMovies);
  };

  const onAddMovie = async (newMovie) => {
    const addedMovie = await fetch("http://localhost:5000", {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(newMovie),
    });

    console.log(addedMovie);

    // console.log(fetched);
    setData(data.concat(newMovie));
  };

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

  const onClickAdd = () => {
    setShowAdd(!showAdd);
  };

  return (
    <div className="App container-fluid">
      <nav>
        <header className="App-header text-center mt-1 bg-dark text-light ">
          <h1>Video Recommendation</h1>
        </header>
        <SearchMovie handler={onChangeHandler} />

        <AddButton onClickHandler={onClickAdd} showAddValue={showAdd} />

        {showAdd && <AddMovie addHandler={onAddMovie} />}
      </nav>

      <main>
        <ul className="videoContainer">
          {filteredMovies.map((movie, index) => (
            <VideoInfo key={index} deleteHandler={deleteMovie} movie={movie} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
