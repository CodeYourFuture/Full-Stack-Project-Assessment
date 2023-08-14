import { useState } from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import "../Style/Addvid.css";
const AddVid = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const submitVid = () => {
    // addVideo({ title, url });
    // setTitle("");
    // setUrl("");
    const newCard = {
      title: title.trim(),
      url: url,
    };
  
    fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCard),})
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(Error => console.log(Error))
  };
  

  return (
    <form onSubmit={submitVid} className="form">
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Url:</label>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      <button type="submit">
        <CloudUploadOutlinedIcon />
      </button>
    </form>
  );
};

export default AddVid;
