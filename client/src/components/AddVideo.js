import { useState } from "react";

export default function AddVideo({ addVideo }) {
  const [input, setInput] = useState({
    title: "",
    url: "",
    rating: 0
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3001", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input)
    });

    const data = await res.json();

    addVideo(input, data.id);

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