import { AppContext } from "../App";
import { useState, useContext } from "react";

export default function AddVideo({ addVideo }) {
  const apiURL = useContext(AppContext);
  const token = localStorage.getItem("token");

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

    const res = await fetch(`${apiURL}/api/videos`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-auth-token": token },
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
          <input id="title" type="text" name="title" value={input.title} onChange={handleChange} required />
        </label>
      </div>

      <div>
        <label>
          Url
          <br />
          <input id="url" type="text" name="url" value={input.url} onChange={handleChange} required />
        </label>
      </div>

      <div>
        <button className="btn-submit" type="submit">Add</button>
      </div>
    </form>
  );
}