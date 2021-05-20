import React, {useState} from "react";

function AddMovie(props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    // will div a random id to the new movie
    let id = Math.floor(Math.random() * 1000000) + 1;
    let rating = 0;

    props.addHandler({id, title, url, rating});

    setTitle("");
    setUrl("");
  };
  return (
    <form className="movieAdder" onSubmit={submitHandler}>
      <input
        className="formField"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Movie Name"
        required
      />

      <input
        className="formField"
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter Movie Url"
        required
      />

      <input className="formField" type="submit" value="Save Movie" />
    </form>
  );
}

export default AddMovie;
