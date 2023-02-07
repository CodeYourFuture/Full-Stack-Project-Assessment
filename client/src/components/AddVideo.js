import { useState } from "react";

export default function AddVideo({ addVideo }) {
  const [input, setInput] = useState({
    id: 0,
    title: "",
    url: "",
    rating: 0
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value, id: Math.round(Math.random() * 1000) });
  }

  const onSubmit = (e) => {
    e.preventDefault();

    addVideo(input);
    setInput({ ...input, title: "", url: "" });
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          Title
          <br />
          <input id="title" type="text" name="title" value={input.title} onChange={handleChange} />
        </label>
      </div>

      <div>
        <label>
          Url
          <br />
          <input id="url" type="text" name="url" value={input.url} onChange={handleChange} />
        </label>
      </div>

      <div>
        <button className="btn-submit" type="submit">Add</button>
      </div>
    </form>
  );
}