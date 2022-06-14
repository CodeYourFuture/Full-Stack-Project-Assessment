import { useState } from "react";

const AddVideo = (props) => {
  const { setData } = props;
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newVideoTitle, setNewVideoTitle] = useState("");

  const postFunction = async () => {
    const addVideo = {
      title: newVideoTitle,
      url: newVideoUrl,
    };
    console.log(addVideo);
    const response = await fetch("http://127.0.0.1:5000", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addVideo),
    });
    const data = await response.json();
    console.log(data);
    setData(data);
    // return setData(data.concat(addVideo));
  };
  const handleClick = async () => {
    await postFunction();
  };

  return (
    <div>
      <p>Add your favorite to the list</p>
      <input
        id="title"
        onChange={(e) => {
          setNewVideoTitle(e.target.value);
        }}
        type="text"
        placeholder="Title"
      ></input>
      <input
        id="url"
        onChange={(e) => {
          setNewVideoUrl(e.target.value);
        }}
        type="text"
        placeholder="Add url here"
      ></input>
      <button className="gradient-button" id="submit" onClick={handleClick}>
        Add video
      </button>
    </div>
  );
};
export default AddVideo;
