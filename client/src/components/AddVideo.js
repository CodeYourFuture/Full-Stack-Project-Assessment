import { useState } from "react";

const dateFormat = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day}-${month}-${year}`;
};

const timeFormat = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hours}-${minutes}-${seconds}`;
};
const AddVideo = (prop) => {
  const [title, settitle] = useState("");
  const [url, setUrl] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [clicked, setClicked] = useState(false);
  const [newvideo, setNewVideo] = useState([{}]);
  const handleChange = (e) => {
    if (e) {
      if (e.target.name === "title") {
        settitle(e.target.value);
      } else if (e.target.name === "url") {
        setUrl(e.target.value);
      }
    }
    setDate(dateFormat(new Date()));
    setTime(timeFormat(new Date()));
    setNewVideo([
      {
        id: Math.floor(Math.random() * 100000000 )+ 1,
        title: title,
        url: url,
        rating:0,
        date: date,
        time: time,
      },
    ]);
  };
  const handleClick = () => {
    setClicked(true);
  }
  const handleDelete = () => {
document.getElementById("addvideoform").reset();
    setClicked(false);

  }
  return (
    <>
      <h2 className="addVideo" onClick={() => handleClick()}>
        Add Video
      </h2>
      <form
        style={{ display: clicked ? "flex" : "none" }}
        className="addvideo-form"
        id="addvideoform"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="addvideo">
          <label htmlFor="title" name="title">
            Title:
            <input
              className="input"
              type="text"
              name="title"
              onChange={(e) => handleChange(e)}
              required
            />
          </label>
        </div>
        <div className="addvideo">
          <label htmlFor="url" name="url">
            {" "}
            URL:
            <input
              className="input"
              type="url"
              name="url"
              onChange={(e) => handleChange(e)}
              required
            />
          </label>
        </div>
        { console.log(newvideo[0].id)}
        <div className="addvideo">
          <button onClick={() => prop.onClick(newvideo)}>Add</button>
          <button onClick={(e) => handleDelete()}>Delete</button>
        </div>
      </form>{" "}
    </>
  );
};

export default AddVideo;
