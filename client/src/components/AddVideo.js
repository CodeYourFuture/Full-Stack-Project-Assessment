import { useState } from "react";

export default function AddVideo() {
  const [input, setInput] = useState({
    title: "",
    url: ""
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  return (
    <form>
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