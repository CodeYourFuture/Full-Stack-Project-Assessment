import React, {useState} from "react";
// import {validateUrl} from "youtube-validate";

function AddMovie(props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  // const [validator, setValidator] = useState(false);

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
      />

      <input
        className="formField"
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter Movie Url"
      />

      <input className="formField" type="submit" value="Save Movie" />
    </form>
  );
}

export default AddMovie;
