import { useState } from "react";

function Search({ searchVideo }) {
  const [text, setText] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    searchVideo(value);
    setText(value);
  }

  return (
    <div>
      <label htmlFor="search">Search</label>
      <input type="text" name="search" id="search" value={text} onChange={(e) => handleChange(e)} />
      <p>{text}</p>
    </div>
  );
}
export default Search;
