import { AppContext } from "../App";
import { useState, useContext } from "react";
import { motion } from "framer-motion";
import jwt from "jwt-decode";

export default function AddVideo({ addVideo }) {
  const apiURL = useContext(AppContext);

  const token = localStorage.getItem("token");
  const { uId } = jwt(token);

  const [input, setInput] = useState({
    title: "",
    url: ""
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!input.url.includes("youtube.com/watch")) return;

    try {
      const res = await fetch(`${apiURL}/api/videos`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-auth-token": token },
        body: JSON.stringify({ userId: uId, ...input })
      });

      const data = await res.json();

      if (res.status === 200) {
        addVideo(data);

        setInput({ ...input, title: "", url: "" });
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: +50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeOut", duration: 1.5 }}
    >
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
    </motion.div>
  );
}