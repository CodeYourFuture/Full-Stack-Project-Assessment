import React, {useState} from "react";

function AddMovie(props) {
  const [movieName, setMovieName] = useState("");
  const [movieUrl, setMovieUrl] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    props.addHandler({movieName, movieUrl});

    setMovieName("");
    setMovieUrl("");
  };
  return (
    <form className="movieAdder" onSubmit={submitHandler}>
      <input
        className="formField"
        type="text"
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)}
        placeholder="Movie Name"
        required
      />

      <input
        className="formField"
        type="text"
        value={movieUrl}
        onChange={(e) => setMovieUrl(e.target.value)}
        placeholder="Movie Url"
        required
      />

      <input className="formField" type="submit" value="Save Movie" />
    </form>
  );
}

export default AddMovie;
